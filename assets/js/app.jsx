import React from 'react';
import MainWrapper from './components/mainWrapper';
import FrontPage from './components/frontPage';
import {Router, Route, IndexRoute} from 'react-router';

React.render((
    <Router>
      <Route path='/' component={MainWrapper}>
        <IndexRoute component={FrontPage}/>
      </Route>
    </Router>),
  document.body);
