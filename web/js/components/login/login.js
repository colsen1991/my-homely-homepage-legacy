import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
  loginActionCreator,
  usernameChanged,
  passwordChanged
} from '../../actions';
import styles from './login.styl';

export const LoginForm = ({ loggedIn, error, posting, success, doLogin, handleUsernameChange, handlePasswordChange }) => {
  let content;

  if (success) browserHistory.push('/admin');
  else if (loggedIn) content = <p>You are already logged in...</p>;
  else {
    content = (
      <form className={styles.form} onSubmit={doLogin}>
        <input type="text" placeholder="Username..." onChange={handleUsernameChange} disabled={posting} required/>
        <input type="password" placeholder="Password..." onChange={handlePasswordChange} disabled={posting} required/>
        <input type="submit" value="Login" disabled={posting}/>
        {error ? <p className={styles.error}>There was an error during your login attempt. Please try again, fuckface.</p> : null}
      </form>
    );
  }

  return (
    <div className={styles.content}>
      <h1>Login</h1>
      {content}
    </div>

  );
};

export function mapStateToProps({ login: { error, posting, success, username, password } }) {
  return { error, posting, success, username, password };
}

export function mapDispatchToProps(dispatch) {
  return {
    handleUsernameChange: event => dispatch(usernameChanged(event)),
    handlePasswordChange: event => dispatch(passwordChanged(event)),
    doLoginWrapper: (username, password) => event => {
      event.preventDefault();

      loginActionCreator(username, password)(dispatch)
    },
    dispatch
  };
}

export function mergeProps({ error, posting, success, username, password }, { handleUsernameChange, handlePasswordChange, doLoginWrapper }, ignore) {
  return {
    error,
    posting,
    success,
    handleUsernameChange,
    handlePasswordChange,
    doLogin: doLoginWrapper(username, password)
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginForm);
