import React from 'react';
import { Link } from 'react-router';
import styles from './header.styl';

export default () => (
  <header className={styles.header}>
    <h1><Link to="/home">My Homely Homepage</Link></h1>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/blog'>Blog</Link>
      <Link to='/about'>About</Link>
    </nav>
  </header>
);
