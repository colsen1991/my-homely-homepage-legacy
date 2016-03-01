import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Routes from './router';

export default class extends Component {
  render() {
    return <Routes history={browserHistory}/>;
  }
}
