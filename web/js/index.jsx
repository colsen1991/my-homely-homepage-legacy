require.context('../img', true, /^\.\//);

import 'babel-polyfill';
import '../style/app.styl';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import cookies from 'js-cookie';
import createStore from './store/store';
import { loginActualSuccess } from './actions';
import Root from './components/root.jsx';
import initErrorHandler from './handlers/error';
import initSecretHandler from './handlers/secret';

initErrorHandler();
initSecretHandler();

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const token = cookies.get('token');
if (token)
  store.dispatch(loginActualSuccess({ token }));

render(
  <Root store={store} history={history}/>,
  document.getElementById('appRoot')
);
