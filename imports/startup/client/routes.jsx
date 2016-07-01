import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/App.jsx';
import AuthContainer from '../../ui/layouts/AuthContainer.jsx';

import Index from '../../ui/pages/Index.jsx';
import TimerDemo from '../../ui/pages/TimerDemo.jsx';
import SignIn from '../../ui/pages/SignIn.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';

Meteor.startup( () => {
  render(

    <Router history={ browserHistory }>
      
      <Route path="/" component={ App }>
        <IndexRoute component={ Index } />        
        <Route path="/signin" component={ SignIn } />
      </Route>
      
      <Route path="/" component={ AuthContainer }>
        <Route path="/timerDemo" component={ TimerDemo } />
      </Route>
      
      <Route path="*" component={ NotFound } />

    </Router>,

    document.getElementById( 'app-container' )
  );
});