import React from 'react';
import Job from "./peli";
import { FormattedMessage } from 'react-intl';
import PeliDetail from './pelidetail';
import * as d3 from 'd3';

export default class PeliList extends React.Component {

  state = { 
  	list: [
    ],
    listen: [
    ],
    selected:[
    {"id": 1,
    "name": "",
    "directedBy": "",
    "country": "",
    "budget": 1,
    "views": 1256000,
    "releaseDate": "",
    "description": "",
    "cast": "",
    "poster": ""
    }
  ]
  };
  componentDidMount() {
    if (!navigator.onLine) {
        if (localStorage.getItem('list') === null)
            this.setState({ list: [] })
        else
            this.setState({ list: JSON.parse(localStorage.getItem('list')), selected: [JSON.parse(localStorage.getItem('list')[0])]});

        if (localStorage.getItem('listen') === null)
            this.setState({ listen: [] })
        else
            this.setState({ listen: JSON.parse(localStorage.getItem('listen')), selected: [JSON.parse(localStorage.getItem('list')[0])] });
    }
  

    fetch("https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json")
      .then(res => {
          return res.json();
      }).then(res => {
          console.log(res);
          console.log(JSON.stringify(res));
          this.setState({ list: res ,selected:[res[0]]});
          localStorage.setItem('list', JSON.stringify(res));
          this.drawChart(res);

      });
      fetch("https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json")
      .then(res => {
          return res.json();
      }).then(res => {
          console.log(res);
          console.log(JSON.stringify(res));
          this.setState({ listen: res ,selected:[res[0]]});
          localStorage.setItem('listen', JSON.stringify(res));
          this.drawChart(res);
      });
      
  }
  
drawChart(data) {
  const canvas = d3.select(this.refs.canvas);



        const width = 700;
        const height = 500;
        const margin = { top:10, left:50, bottom: 40, right: 10};
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top -margin.bottom;
        
        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);
        
        
         const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
                const y = d3.scaleLinear() 
                .domain([0, 30])
                .range([iheight, 0]);
            
            const x = d3.scaleBand()
            .domain(data.map(d => d.id) ) 
            .range([0, iwidth])
            .padding(0.1);  
        
        const bars = g.selectAll("rect").data(data);
        
        bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", d => x(d.id))
        .attr("y", d => y(d.views))
        .attr("height", d => iheight - y(d.views))
        .attr("width", x.bandwidth())
        
        
        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  
        
        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));


      
     
}

  handleRowClick(peli) {
    // Aqui realizas la lógica para abrir el modal pasándole el ticket seleccionado.
  console.log("hola");
    this.setState({selected:[peli]});
  }
  getData(){
    var u=navigator.language|| navigator.userLanguage;
var m;
var y;
    if(u==="es-ES"){
      y=this.state.list[0];
        m=this.state.list;
        
    }else{
      y=this.state.listen[0];  
      m=this.state.listen;
  }

    
  return m;
  }
  
  render() {
		this.handleRowClick=this.handleRowClick.bind(this);

    return (
      <div>
        <div className="row">
        <div className="col-7">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col"><FormattedMessage id="Name"/></th>
              <th scope="col"><FormattedMessage id="Directed by"/></th>
              <th scope="col"><FormattedMessage id="Country"/></th>
              <th scope="col"><FormattedMessage id="Budget"/></th>
              <th scope="col"><FormattedMessage id="Release"/></th>
              <th scope="col"><FormattedMessage id="Views"/></th>
            </tr>
          </thead>
          <tbody>
              {this.getData().map( (e,i) => <Job handleRowClick={this.handleRowClick} key={i} peli={e}/>)}
          </tbody>
        </table>
        </div>
        <div className="col-5">
          <PeliDetail  p={this.state.selected[0]}></PeliDetail>
        </div>
        </div>
        <div ref="canvas">

        </div>
      </div>
    );
  }
}