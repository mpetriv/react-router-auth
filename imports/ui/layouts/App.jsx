import React from 'react';
import Navigation from '../components//navigation/Navigation.jsx';

export const App = ( { children } ) => (
  <div>
    <Navigation />
    <div className="w3-container">
    	{ children }
    </div>
  </div>
)