import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Navigation = () => (
  <ul>
    <li><b><IndexLink to="/" activeClassName="active">Index </IndexLink></b></li>
    <li><b><Link to="/about" activeClassName="active">About </Link></b></li>
    <li><b><Link to="/admin" activeClassName="active">Admin Page </Link></b><small>(NEED to login)</small></li>
    <li><b><Link to="/admin/profile" activeClassName="active">Admin Profile </Link></b><small>(NEED to login)</small></li>
    <li><b><Link to="/signin" activeClassName="active">Sign in Page</Link></b></li>
  </ul>
)