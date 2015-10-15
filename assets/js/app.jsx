import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import MainWrapper from './components/mainWrapper';
import FrontPage from './components/frontPage';
import BlogList from './components/blog/blogList';
import BlogPost from './components/blog/blogPost';
import PageNotFound from './components/pageNotFound';
import About from './components/about';
import Login from './components/login';

render((
    <Router>
      <Route path='/' component={MainWrapper}>
        <IndexRoute component={FrontPage}/>
        <Route path='blog' component={BlogList}/>
        <Route path='blog/:blogId' component={BlogPost}/>
        <Route path='about' component={About}/>
        <Route path='login' component={Login}/>
        <Route path='*' component={PageNotFound}/>
      </Route>
    </Router>),
  document.getElementById('js-anchor'));
