import React from 'react';
import {FormattedDate,FormattedNumber, FormattedPlural, FormattedMessage} from 'react-intl';


export default class Peli extends React.Component {

  	render() {
  		return (
			<tr id={this.props.peli.id} onClick={() => this.props.handleRowClick(this.props.peli)}>
  			
  				<th scope="row">{this.props.peli.id}</th>
      			<td>{this.props.peli.name}</td>
  				<td>{this.props.peli.directedBy}</td>
      			<td>{this.props.peli.budget} 
				  <FormattedPlural
    value={this.props.peli.budget}
	one={<FormattedMessage id="One"/>}
	other={<FormattedMessage id="Other"/>}
  />
				  
				  
				  </td>
				  <td>{this.props.peli.country}</td>
      			<td>
  <FormattedDate
    value={new Date(this.props.peli.releaseDate)}
    year='numeric'
    month='long'
    day='numeric'
    weekday='long'
  />
</td>
<td><FormattedNumber value={this.props.peli.views}/></td>
  			</tr>
  		);
	}
}