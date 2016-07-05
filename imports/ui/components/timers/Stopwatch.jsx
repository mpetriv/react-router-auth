import React, { Component } from 'react';
import Timer from './Timer.jsx';

export default class Stopwatch extends Timer {
  constructor(props) {
    super(props);            
    this.state = {
      seconds: this.props.timer.seconds + this.difference,
    };
  }
  
  tick() {
    this.setState({seconds: this.state.seconds + 1});
  }
}
