import React from 'react';
import { Navigation } from '../components/Navigation.jsx';

export const App = ( { children } ) => (
  <div>
    <Navigation />
    <div className="pageContainer">
    	{ children }
    </div>
  </div>
)