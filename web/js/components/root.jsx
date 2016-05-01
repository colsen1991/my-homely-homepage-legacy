import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from './router.jsx';

class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Routes history={this.props.history}/>
      </Provider>
    );
  }
}

export default Root;
