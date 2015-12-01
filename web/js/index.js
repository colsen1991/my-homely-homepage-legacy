import React from 'react';
import {render} from 'react-dom';
import Root from './components/root';
import './../css/app.styl';

render(
  <Root/>,
  document.getElementById('app-root')
);
