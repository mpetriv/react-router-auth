import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Timers } from '../../../api/timers.js';

import Timer from './Timer.jsx';

class TimersList extends Component {
  
  handleSubmit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Meteor.call('timers.insert', text);
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTimers() {
    return this.props.timers.map((timer) => (
      <Timer key={timer._id} timer={timer} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
        	<h1>Timers List</h1>
        	<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
	          <input
	            type="text"
	            ref="textInput"
	            placeholder="Timer description"
	          />
	        </form>
        </header>

        <ul>
          {this.renderTimers()}
        </ul>
      </div>
    );
  }
}

TimersList.propTypes = {
  timers: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('timers');

  return {
    timers: Timers.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.users.findOne(Meteor.userId()),
  };
}, TimersList);