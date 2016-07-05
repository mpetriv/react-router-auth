import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

export default class Navigation extends Component {
	render() {
		return (
			<div>
			<div className="w3-top">
		  		<ul className="w3-navbar w3-red w3-large">
		    		<li><IndexLink to="/" activeClassName="w3-green">Index </IndexLink></li>
		    		<li><Link to="/timerDemo" activeClassName="w3-green">Timer Demo</Link></li>
		    		<li><Link to="/signin" activeClassName="w3-green">Sign in</Link></li>
		  		</ul>  
		  	</div>
		  	<br/><br/>
		  	</div>
		)
	}
}