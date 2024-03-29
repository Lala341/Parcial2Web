import React from 'react';


export default class PeliDetail extends React.Component {

  	render() {
  		return (
            <div className="card" >
            <img src={this.props.p.poster} class="card-img-top" alt="Fuera de linea"></img>
            <div class="card-body">
              <h5 class="card-title">{this.props.p.name}</h5>
              <p class="card-text">{this.props.p.description}</p>
              <h3 class="card-title">Cast</h3>
              <p class="card-text">{this.props.p.cast}</p>
            </div>
          </div>
  		);
	}
}