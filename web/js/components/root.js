import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from './router';

export default class extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Routes history={this.props.history}/>
      </Provider>
    );
  }
}
