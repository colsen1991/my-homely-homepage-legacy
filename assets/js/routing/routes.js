import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './../components/app';
import FrontPage from './../components/frontPage';
import BlogList from './../components/blog/blogList';
import BlogPost from './../components/blog/blogPost';
import PageNotFound from './../components/pageNotFound';
import About from './../components/about';
import Login from './../components/login';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={FrontPage}/>
    <Route path='blog' component={BlogList}/>
    <Route path='blog/:blogId' component={BlogPost}/>
    <Route path='about' component={About}/>
    <Route path='login' component={Login}/>
    <Route path='*' component={PageNotFound}/>
  </Route>
);
