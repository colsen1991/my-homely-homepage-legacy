import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';
import {Route, IndexRoute} from 'react-router';
import DevTools from './components/devTools';
import FrontPage from './components/frontPage';
import BlogList from './components/blog/blogList';
import BlogPost from './components/blog/blogPost';
import PageNotFound from './components/pageNotFound';
import About from './components/about';
import Login from './components/login';

export default class Root extends Component {
  render() {
    const {store} = this.props;

    return (
      <Provider store={store}>
        <div>
          <ReduxRouter/>
          <DevTools/>
        </div>
      </Provider>
    );
  }
}

// TODO This for the whole thang!
Root.propTypes = {
  store: PropTypes.object.isRequired
};
