import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './header.styl';

export function doesHrefAndPathMatch(href, path = '/') {
  if (href === '/')
    return href === path;

  return path.includes(href);
}

export const HeaderLink = ({ to, activePath, children }) => {
  const isLinkActive = doesHrefAndPathMatch(to, activePath);
  const props = {
    className: classNames({
      [styles.activeLink]: isLinkActive,
      [styles.inactiveLink]: !isLinkActive
    }),
    to
  };

  return <Link {...props}>{children}</Link>;
};

export const Header = ({ activePath, search }) => (
  <header className={styles.header}>
    <h1>
      <Link to="/" tabIndex="-1">Christer Olsen</Link>
    </h1>
    <nav className={styles.navigationBar}>
      <HeaderLink to="/" activePath={activePath}>Home</HeaderLink>
      <HeaderLink to="/blog" activePath={activePath}>Blog</HeaderLink>
      <HeaderLink to="/about" activePath={activePath}>About</HeaderLink>
      <input role="search" type="search" value={search.split('=')[1]} onChange={event => browserHistory.push('/blog?search=' + escape(event.target.value))} placeholder="Search..." />
    </nav>
  </header>
);

export function connectStateToProps({ routing: { locationBeforeTransitions: { pathname, search } } }) {
  return { activePath: pathname, search };
}

export default connect(connectStateToProps)(Header);
