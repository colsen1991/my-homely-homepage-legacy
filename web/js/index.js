import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store';
import Root from './components/root';
import '../style/app.styl';

require.context('../img', true, /^\.\//);

window.onerror = () => {
  console.error('JS error!'); // TODO Error to server
};

// TODO Initial state from local storage

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history}/>,
  document.getElementById('app-root')
);
