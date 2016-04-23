import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store/store';
import Root from './components/root.jsx';
import '../style/app.styl';

require.context('../img', true, /^\.\//);

window.onerror = () => {
  // TODO Error to server
  console.error('JS error!'); // eslint-disable-line
};

// TODO Initial state from local storage

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history}/>,
  document.getElementById('app-root')
);
