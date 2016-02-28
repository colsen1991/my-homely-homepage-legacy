import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { post } from '../../utils/httpUtils';
import { loginUrl } from '../../endpoints/endpoints';
import styles from './login.styl';

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };

    post(loginUrl, options)
      .then(data => {
        localStorage[ 'token' ] = data.token;

        browserHistory.push('/loginSuccesful');
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <form className={styles.login} onSubmit={this.handleSubmit.bind(this)}>
        <h1>Login</h1>
        <input type="text" placeholder="Username..." ref="username"/>
        <input type="password" placeholder="Password..." ref="password"/>
        <input type="submit" value="Login"/>
      </form>
    );
  }
}

const AlreadyLoggedIn = () => <p>You are already logged in...</p>;

export default ({ history }) => localStorage[ 'token' ] ? <AlreadyLoggedIn/> : <LoginForm history={history}/>;
