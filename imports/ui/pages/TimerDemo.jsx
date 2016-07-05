import React, { Component, PropTypes } from 'react';

import TimersList from '../components/timers/TimersList.jsx';

export default class TimerDemo extends Component {
  render() {
    return (
    	<div className='w3-container'>
    		<TimersList />
    	</div>
    )
  }
}

