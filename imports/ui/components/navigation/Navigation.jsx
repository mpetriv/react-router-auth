import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Navigation = () => (
  <ul>
    <li><b><IndexLink to="/" activeClassName="active">Index </IndexLink></b></li>
    <li><b><Link to="/timerDemo" activeClassName="active">Timer Demo Page </Link></b></li>
    <li><b><Link to="/signin" activeClassName="active">Sign in Page</Link></b></li>
  </ul>
)