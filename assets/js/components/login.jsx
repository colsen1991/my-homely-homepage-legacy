import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {post} from '../utils/httpUtils';
import {loginUrl} from './../config/endpoints';

class LoginForm extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    if (!username || !password) {
      return false;
    }

    const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    };

    post(loginUrl, options)
      .then(data => {
        localStorage['token'] = data.token;

        this.props.history.pushState(null, '/loginSuccesful');
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <form id='login-form' onSubmit={this.handleSubmit.bind(this)}>
        <h1>Login</h1>
        <input type="text" placeholder="Username..." ref="username"/>
        <input type="password" placeholder="Password..." ref="password"/>
        <input type="submit" value="Login"/>
      </form>
    );
  }
}

const AlreadyLoggedIn = () => {
  return (
    <p>You are already logged in...</p>
  );
};

export default class Login extends Component {
  render() {
    return (localStorage['token'] ? <AlreadyLoggedIn/> : <LoginForm history={this.props.history}/>);
  }
}
