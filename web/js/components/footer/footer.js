import React from 'react';
import { Link } from 'react-router';
import styles from './footer.styl';

export default () => (
  <footer className={styles.footer}>
    <span>Copyright © 2016 Christer Olsen</span>
    <span className={styles.images}>
      <Link to="https://www.facebook.com/colsen1991"><img src="/img/facebook.png" alt="Facebook"/></Link>
      <Link to="https://plus.google.com/100503672047908745160"><img src="/img/gplus.png" alt="Google+"/></Link>
      <Link to="https://github.com/colsen1991"><img src="/img/github.png" alt="GitHub"/></Link>
      <Link to="https://twitter.com/colsen1991"><img src="/img/twitter.png" alt="Twitter"/></Link>
      <Link to="https://www.linkedin.com/in/christer-olsen-15845b53"><img src="/img/linkedin.png" alt="LinkedIn"/></Link>
    </span>
  </footer>
)
