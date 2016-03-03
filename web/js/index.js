import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store/store';
import Root from './components/root';
//import { setActiveUrl } from './store/store.js';
import '../css/app.styl';

//setActiveUrl(window.location.pathname);

window.onerror = () => {
  console.error('js error!'); // temp
};

const store = createStore(browserHistory);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history}/>,
  document.getElementById('app-root')
);
