import React from 'react';
import MainWrapper from './components/mainWrapper';
import FrontPage from './components/frontPage';
import {Router, Route, IndexRoute} from 'react-router';
import BlogList from './components/blogList';
import BlogPost from './components/blogPost';
import PageNotFound from './components/pageNotFound';
import About from './components/about';

React.render((
    <Router>
      <Route path='/' component={MainWrapper}>
        <IndexRoute component={FrontPage}/>
        <Route path='blog' component={BlogList}/>
        <Route path='blog/:blogId' component={BlogPost}/>
        <Route path='about' component={About}/>
        <Route path='*' component={PageNotFound}/>
      </Route>
    </Router>),
  document.body);
