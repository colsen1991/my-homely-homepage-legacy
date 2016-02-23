import React from 'react';
import {Link} from 'react-router';

export default () => (
  <header id='site-header'>
    <h1>My Homely Homepage</h1>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/blog'>Blog</Link>
      <Link to='/about'>About</Link>
    </nav>
  </header>
);
