import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import createStore from '../store/store';
import Routes from './routes';
import DevTools from './devTools';

const store = createStore(browserHistory);

const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <Provider store={store}>
    <div>
      <Routes history={history}/>
      <DevTools/>
    </div>
  </Provider>
);
