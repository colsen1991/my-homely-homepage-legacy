import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store/store';
import Root from './components/root.jsx';
import 'babel-polyfill';
import '../style/app.styl';
require.context('../img', true, /^\.\//);

window.onerror = () => {
  // TODO Error to server
  console.error('JS error!'); // eslint-disable-line
};

const ssc = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let sscIndex = 0;

window.onkeydown = ({ which }) => {
  if (ssc[sscIndex] === which) {
    sscIndex++;

    if (sscIndex === ssc.length && confirm('goto admin?')) browserHistory.push('/admin'); // eslint-disable-line
  } else sscIndex = 0;
};

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history}/>,
  document.getElementById('app-root')
);
