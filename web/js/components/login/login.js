import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { post } from '../../utils/httpUtils';
import {
  loginActionCreator,
  usernameChanged,
  passwordChanged
} from '../../actions';
import styles from './login.styl';

export const LoginForm = ({ loggedIn, error, posting, success, doLogin, handleUsernameChange, handlePasswordChange }) => {
  let content;

  if (success) content = <p>You have logged in successfully. Click <Link to="/admin">here</Link> to go to the admin page.</p>;
  else if (loggedIn) content = <p>You are already logged in...</p>;
  else {
    content = (
      <form className={styles.form} onSubmit={doLogin}>
        <input type="text" placeholder="Username..." onChange={handleUsernameChange} disabled={posting}/>
        <input type="password" placeholder="Password..." onChange={handlePasswordChange} disabled={posting}/>
        <input type="submit" value="Login" disabled={posting}/>
        {error ? <p>There was an error during your login attempt. Please try again, fuckface.</p> : null}
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

export function mapStateToProps({ login }) {
  return login;
}

export function mapDispatchToProps(dispatch) {
  return {
    handleUsernameChange: event => dispatch(usernameChanged(event)),
    handlePasswordChange: event => dispatch(passwordChanged(event)),
    dispatch
  };
}

export function mergeProps({ loggedIn, error, posting, success, username, password }, { handleUsernameChange, handlePasswordChange, dispatch }, ignore) {
  return {
    loggedIn,
    error,
    posting,
    success,
    handleUsernameChange,
    handlePasswordChange,
    doLogin: event => {
      event.preventDefault();

      loginActionCreator(username, password)(dispatch);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginForm);
