import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/App.jsx';
import AuthContainer from '../../ui/layouts/AuthContainer.jsx';

import { Index } from '../../ui/pages/Index.jsx';
import { About } from '../../ui/pages/About.jsx';
import SignIn from '../../ui/pages/SignIn.jsx';
import { Admin } from '../../ui/pages/Admin.jsx';
import { Profile } from '../../ui/pages/Profile.jsx';
import { NotFound } from '../../ui/pages/NotFound.jsx';

Meteor.startup( () => {
  render(

    <Router history={ browserHistory }>
      
      <Route path="/" component={ App }>
        <IndexRoute component={ Index } />
        <Route path="/about" component={ About } />
        <Route path="/signin" component={ SignIn } />
      </Route>
      
      <Route path="/admin" component={ AuthContainer }>
        <IndexRoute component={ Admin } />
        <Route path="profile" component={ Profile } />
      </Route>
      
      <Route path="*" component={ NotFound } />

    </Router>,

    document.getElementById( 'app-container' )
  );
});