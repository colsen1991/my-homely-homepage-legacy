import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { login, usernameChanged, passwordChanged } from '../../actions';
import styles from './login.styl';

export const LoginForm = ({ loggedIn, error, posting, doLogin, handleUsernameChange, handlePasswordChange }) => {
  let content;

  if (loggedIn) content = <p>You are already logged in, <Link onlyActiveOnIndex={false} to="/admin">admin</Link>...</p>;
  else {
    content = (
      <form className={styles.form} onSubmit={doLogin}>
        <input type="text" placeholder="Username..." onChange={handleUsernameChange} disabled={posting} required/>
        <input type="password" placeholder="Password..." onChange={handlePasswordChange} disabled={posting} required/>
        <input type="submit" value="Login" disabled={posting}/>
        {error ? <p className={styles.error}>There was an error during your login attempt. Please try again.</p> : null}
      </form>
    );
  }

  return (
    <div className={styles.content}>
      {content}
    </div>

  );
};

export function mapStateToProps({ login: { loggedIn, error, posting, username, password } }) {
  return { loggedIn, error, posting, username, password };
}

export function mapDispatchToProps(dispatch) {
  return {
    handleUsernameChange: event => dispatch(usernameChanged(event)),
    handlePasswordChange: event => dispatch(passwordChanged(event)),
    doLoginWrapper: (username, password) => event => {
      event.preventDefault();

      dispatch(login(username, password));
    }
  };
}

export function mergeProps({ username, password, ...stateProps }, { doLoginWrapper, ...dispatchProps }, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    doLogin: doLoginWrapper(username, password),
    ...ownProps
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginForm);
