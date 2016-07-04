import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.difference = 0;
    if(this.props.timer.started){
      this.difference = Math.round((moment() - moment(this.props.timer.startedAt))/1000);
    }        
    this.state = {
      secondsElapsed: this.props.timer.secondsElapsed + this.difference,
    };
  }

  componentDidMount() {
    if(this.props.timer.started){
      this.interval = setInterval(this.tick.bind(this), 1000);
    }   
  }

  tick() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  }

  componentWillUnmount() {    
    clearInterval(this.interval);
  }
    
  toggleStarted() {
    if(!this.props.timer.started){
      this.interval = setInterval(this.tick.bind(this), 1000);
    }else{
      clearInterval(this.interval);
    }
    Meteor.call('timer.setStarted', this.props.timer._id, !this.props.timer.started, this.state.secondsElapsed);
  }

  deleteTimer() {
    Meteor.call('timer.remove', this.props.timer._id);
  }  

  secondsToTime(sec_num) {    
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if(hours < 10){
      hours   = `0${hours}`;
    }
    if(minutes < 10){
      minutes = `0${minutes}`;
    }
    if(seconds < 10){
      seconds = `0${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
  }  

  render() {
    return (      
      <li className='timer-el'>        
        <button className="delete" onClick={this.deleteTimer.bind(this)}>
          &times;
        </button>
        <button className='delete' onClick={this.toggleStarted.bind(this)}>
          {this.props.timer.started ? 'stop' : 'start'}
        </button>
        <span className='text'>
          <strong>{this.props.timer.desc}</strong>: {this.secondsToTime(this.state.secondsElapsed)}
        </span>
      </li>
    );
  }

}
