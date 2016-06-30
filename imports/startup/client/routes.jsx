import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/app.jsx';
import AuthContainer from '../../ui/layouts/authContainer.jsx';

import { Index } from '../../ui/pages/index.jsx';
import { About } from '../../ui/pages/about.jsx';
import SignIn from '../../ui/pages/signin.jsx';
import { Admin } from '../../ui/pages/admin.jsx';
import { Profile } from '../../ui/pages/profile.jsx';
import { NotFound } from '../../ui/pages/notFound.jsx';

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