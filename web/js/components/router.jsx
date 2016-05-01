import React from 'react';
import { Router as ReactRouter, Route, IndexRoute } from 'react-router';
import App from './app.jsx';
import FrontPage from './frontPage.jsx';
import BlogList from './blog/excerpts.jsx';
import BlogPost from './blog/post.jsx';
import About from './about.jsx';
import Admin from './admin/admin.jsx';
import Login from './login/login.jsx';
import NewOrEdit from './blog/newOrEdit.jsx';
import { PageNotFound } from './errors.jsx';

const Router = ({ history }) => (
  <ReactRouter history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={FrontPage}/>
      <Route path="blog" component={BlogList}/>
      <Route path="blog/:id" component={BlogPost}/>
      <Route path="blog/*" component={BlogPost}/>
      <Route path="about" component={About}/>
      <Route path="login" component={Login}/>
      <Route path="admin" component={Admin}/>
      <Route path="editBlog/:_id" component={NewOrEdit}/>
      <Route path="newBlog" component={NewOrEdit}/>
      <Route path="*" component={PageNotFound}/>
    </Route>
  </ReactRouter>
);

export default Router;
