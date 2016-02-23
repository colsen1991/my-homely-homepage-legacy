import React from 'react';
import {Link} from 'react-router';

export default () => (
  <footer id='site-footer'>
    <span>This site is protected by some copyright bullshit but not really cus open-source...</span>
    <span>Admin? <Link to='/login'>Login</Link></span>
  </footer>
)