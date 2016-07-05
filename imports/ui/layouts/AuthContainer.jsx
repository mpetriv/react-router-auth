import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Navigation from '../components/navigation/Navigation.jsx';

class AuthContainer extends Component {

  componentWillMount() {
    if (!this.props.currentUserId) {
      browserHistory.push('/signin');
    }
  }

  componentDidUpdate() {
    if (!this.props.currentUserId) {
      browserHistory.push('/signin');
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="w3-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  return {    
    currentUserId: Meteor.userId()
  };
}, AuthContainer);