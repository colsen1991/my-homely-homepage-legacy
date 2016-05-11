import React from 'react';
import { Router as ReactRouter, Route, IndexRoute } from 'react-router';
import App from './app.jsx';
import FrontPage from './frontPage.jsx';
import Blog from './blog/blog.jsx';
import BlogList from './blog/excerpts/excerpts.jsx';
import BlogPost from './blog/post/post.jsx';
import About from './about.jsx';
import Admin from './admin/admin.jsx';
import Login from './login/login.jsx';
import NewOrEdit from './blog/newOrEdit/newOrEdit.jsx';
import { PageNotFound } from './errors.jsx';

const Router = ({ history }) => (
  <ReactRouter history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={FrontPage}/>
      <Route path="blog" component={Blog}>
        <IndexRoute component={BlogList}/>
        <Route path="new" component={NewOrEdit}/>
        <Route path="edit/:_id" component={NewOrEdit}/>
        <Route path=":id" component={BlogPost}/>
      </Route>
      <Route path="about" component={About}/>
      <Route path="login" component={Login}/>
      <Route path="admin" component={Admin}/>
      <Route path="*" component={PageNotFound}/>
    </Route>
  </ReactRouter>
);

export default Router;
