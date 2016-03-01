import React from 'react';
import { render } from 'react-dom';
import Router from './components/root';
import { setActiveUrl } from './store/store.js';
import '../css/app.styl';

setActiveUrl(window.location.pathname);

render(
  <Router/>,
  document.getElementById('app-root')
);
