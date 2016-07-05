import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Timers } from '../../../api/timers.js';

import Stopwatch from './Stopwatch.jsx';
import Countdown from './Countdown.jsx';

class TimersList extends Component {
  
  stopwatchSubmit(event) {
    event.preventDefault();
    const description = this.refs.stopwatchDesc.value.trim();
    Meteor.call('timers.insert', description, 'stopwatch');
    this.refs.stopwatchDesc.value = '';
  }

  countdownSubmit(event) {
    event.preventDefault();
    const description = this.refs.countdownDesc.value.trim();
    Meteor.call('timers.insert', description, 'countdown');
    this.refs.countdownDesc.value = '';
  }

  renderTimers() {
    return this.props.timers.map((timer) => (
      timer.type == 'stopwatch' ? <Stopwatch key={timer._id} timer={timer} /> : <Countdown key={timer._id} timer={timer} />
    ));
  }

  getUserName(){
    if(this.props.currentUser)
      return this.props.currentUser.username;
  }

  render() {
    const { currentUser } = this.props;
    return (

      <div className="w3-container">
      
        <div className="w3-row">
          <div className="w3-container w3-half">          
            <div className="w3-card-4">
              <div className="w3-container w3-blue">
                <h2>Stopwatch</h2>
              </div>
              <form className="w3-container" onSubmit={this.stopwatchSubmit.bind(this)}>
                <p>
                  <input className="w3-input" 
                    type="text" 
                    ref="stopwatchDesc"
                  />
                  <label>Timer description</label>
                </p>
                <p><button className="w3-btn w3-dark-grey" onclick={this.stopwatchSubmit.bind(this)}>Add</button></p>
              </form>
            </div>          
          </div>
          <div className="w3-container w3-half">
            <div className="w3-card-4">
              <div className="w3-container w3-yellow">
                <h2>Countdown</h2>
              </div>
              <form className="w3-container" onSubmit={this.countdownSubmit.bind(this)}>
                <p>
                  <input className="w3-input" 
                    type="text" 
                    ref="countdownDesc"
                  />
                  <label>Timer description</label>
                </p>              
                <p><button className="w3-btn w3-dark-grey" onclick={this.countdownSubmit.bind(this)}>Add</button></p>
              </form>
            </div>
          </div>
        </div>

        <br/>

        <div className="w3-row">
          <div className="w3-container w3-quarter"></div>
          <div className="w3-container w3-half">
            <table className="w3-table w3-striped w3-border">
            <thead>
            <tr className="w3-teal">
              <th>Description</th>
              <th>Type</th>
              <th>Time</th>
              <th>Start/Stop</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
              {this.renderTimers()}
            </tbody>
            </table> 
          </div>
          <div className="w3-container w3-quarter"></div>
        </div>

        <div id="modal"></div>

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
    timers: Timers.find({}, { sort: { desc: 1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, TimersList);