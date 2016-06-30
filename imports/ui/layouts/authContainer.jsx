import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Navigation } from '../components/navigation.jsx';

class AuthContainer extends Component {

  componentWillMount() {
    if (!this.props.currentUser) {
      browserHistory.push('/signin');
    }
  }

  componentDidUpdate() {
    if (!this.props.currentUser) {
      browserHistory.push('/signin');
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="pageContainer">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  return {    
    currentUser: Meteor.user()
  };
}, AuthContainer);