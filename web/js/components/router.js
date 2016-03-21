import React from 'react';
import {
  Router,
  Route,
  IndexRoute
} from 'react-router';
import App from './app';
import FrontPage from './frontPage';
import BlogList from './blog/excerpts';
import BlogPost from './blog/post';
import About from './about';
import Admin from './admin/admin';
import Login from './login/login';
import NewOrEdit from './blog/newOrEdit';
import PageNotFound from './errors/404';

export default ({ history }) => (
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={FrontPage}/>
      <Route path='blog' component={BlogList}/>
      <Route path='blog/:id' component={BlogPost}/>
      <Route path='blog/*' component={BlogPost}/>
      <Route path='about' component={About}/>
      <Route path='login' component={Login}/>
      <Route path='admin' component={Admin}/>
      <Route path='editBlog/:_id' component={NewOrEdit}/>
      <Route path='newBlog' component={NewOrEdit}/>
      <Route path='*' component={PageNotFound}/>
    </Route>
  </Router>
);
