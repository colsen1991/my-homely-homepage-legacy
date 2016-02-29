import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { setActiveUrl, location } from './../../store/store.js';
import styles from './header.styl';

export const Header = ({ activeUrl }) => (
  <section className={styles.siteHeader}>
    <header>
      <h1>
        <Link onClick={() => setActiveUrl('/')} to="/">My Homely Homepage</Link>
      </h1>
    </header>
    <nav className={styles.navigationBar}>
      <Link onClick={() => setActiveUrl('/')} to='/' className={classNames({[styles.activeUrl]: activeUrl === '/'})}>Home</Link>
      <Link onClick={() => setActiveUrl('/blog')} to='/blog' className={classNames({[styles.activeUrl]: activeUrl === '/blog'})}>Blog</Link>
      <Link onClick={() => setActiveUrl('/about')} to='/about' className={classNames({[styles.activeUrl]: activeUrl === '/about'})}>About</Link>
    </nav>
  </section>
);

export default observer(() => <Header {...location}/>);
