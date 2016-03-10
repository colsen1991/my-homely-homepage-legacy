import React from 'react';
import { connect } from 'react-redux';
import Login from '../login/login';
import styles from './admin.styl';

export const Admin = ({ loggedIn }) => {
  if (!loggedIn)
    return <Login/>

  return (
    <div>
      <textarea name="text"  cols="30" rows="10"/>
    </div>
  );
};

function mapStateToProps({ login: { loggedIn } }) {
  return { loggedIn };
}

export default connect(mapStateToProps)(Admin);
