import React, { Component } from 'react';
import Timer from './Timer.jsx';
import ReactDOM from 'react-dom';
import Modal from '../modal/Modal.jsx'

export default class Countdown extends Timer {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.timer.seconds - this.difference,
    };
  }

  showModal() {
    ReactDOM.render(<Modal timerDesc={this.props.timer.desc}/>, document.getElementById('modal'));
  }

  tick() {
    if(this.state.seconds > 0){
      this.setState({seconds: this.state.seconds - 1});
    }
    else{
      clearInterval(this.interval);
      this.toggleStarted();
      this.showModal();
    }
  }
}
