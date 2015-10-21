import 'babel-core/polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import Root from './assets/js/root';
import getStore from './assets/js/store/store';
import './assets/css/app.styl';

const store = getStore();

render(
  <Root store={store}/>,
  document.getElementById('app-root')
);
