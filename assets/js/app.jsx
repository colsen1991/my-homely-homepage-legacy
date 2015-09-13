import React from 'react';
import MainWrapper from './mainWrapper';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';

React.render((
  <Router>
    <Route path="/" component={MainWrapper}/>
  </Router>),
  document.body);
