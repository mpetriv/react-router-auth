import React, { Component } from 'react';
import { Navigation } from '../components/navigation/Navigation.jsx';

export default class NotFound extends Component {
	render() {
		return (
			<div>
				<Navigation />
			    <div className="pageContainer">
			    	<h3>404: Sorry, requested page not found</h3>
			    </div>
			</div>
		)  
	}
}