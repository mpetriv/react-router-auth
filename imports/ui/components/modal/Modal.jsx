import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {display: 'block'},
    };
  }

  close(){
    this.setState({style:{display: 'none'}});
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode); 
  }
  
  render() {
    return (
      <div id={moment()} className="w3-modal" style={this.state.style}>
        <div className="w3-modal-content">
          <div className="w3-container">
            <span className="w3-closebtn" onClick={this.close.bind(this)}>&times;</span>
            <p>Countdown timer <span className="w3-tag w3-teal">{this.props.timerDesc}</span> has stopped</p>                    
          </div>
        </div>
      </div>
    )
  }
}
