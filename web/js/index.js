import React from 'react';
import { render } from 'react-dom';
import Router from './components/routing/router';
import '../css/app.styl';

render(
  <Router/>,
  document.getElementById('app-root')
);
