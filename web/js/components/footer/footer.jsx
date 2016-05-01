import React from 'react';
import styles from './footer.styl';

export default () => (
  <footer className={styles.footer}>
    <span>Copyright © 2016 Christer Olsen</span>
    <span className={styles.images}>
      <a target="_blank" href="https://www.facebook.com/colsen1991"><img src="/img/facebook.png" alt="Facebook"/></a>
      <a target="_blank" href="https://plus.google.com/100503672047908745160"><img src="/img/gplus.png" alt="Google+"/></a>
      <a target="_blank" href="https://github.com/colsen1991"><img src="/img/github.png" alt="GitHub"/></a>
      <a target="_blank" href="https://twitter.com/colsen1991"><img src="/img/twitter.png" alt="Twitter"/></a>
      <a target="_blank" href="https://www.linkedin.com/in/christer-olsen-15845b53"><img src="/img/linkedin.png" alt="LinkedIn"/></a>
      <a target="_blank" href="https://www.couchsurfing.com/people/christer-olsen"><img src="/img/couchsurfing.png" alt="LinkedIn"/></a>
      <a target="_blank" href="https://www.airbnb.com/users/show/59022431"><img src="/img/airbnb.png" alt="LinkedIn"/></a>
    </span>
  </footer>
);
