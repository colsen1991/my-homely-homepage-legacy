import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store';
import Root from './components/root';
import '../css/app.styl';

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

let doneUnloading = false;

window.onunload = window.onbeforeunload = () => {
  if (!doneUnloading) {
    doneUnloading = true;
    // TODO Save state to local storage
  }
};
