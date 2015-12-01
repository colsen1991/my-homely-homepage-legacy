import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import {syncReduxAndRouter} from 'redux-simple-router';
import {createHashHistory} from 'history';
import createStore from '../store/store';
import App from './../components/app';
import DevTools from './devTools';
import FrontPage from './../components/frontPage';
import BlogList from './../components/blog/blogList';
import BlogPost from './../components/blog/blogPost';
import About from './../components/about';
import Login from './../components/login';
import PageNotFound from './../components/pageNotFound';

const store = createStore();
const history = createHashHistory();

syncReduxAndRouter(history, store);

const Root = () => (
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={FrontPage}/>
          <Route path='blog' component={BlogList}/>
          <Route path='blog/:blogId' component={BlogPost}/>
          <Route path='about' component={About}/>
          <Route path='login' component={Login}/>
          <Route path='*' component={PageNotFound}/>
        </Route>
      </Router>
      <DevTools/>
    </div>
  </Provider>
);

export default Root;
