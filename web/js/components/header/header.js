import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './header.styl';

export function doesHrefAndPathMatch(href, path = '/') {
  if (href === '/')
    return href === path;

  return path.indexOf(href) >= 0;
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

export const SiteHeader = ({ activePath }) => {
  return (
    <header className={styles.siteHeader}>
      <h1>
        <Link to="/">My Homely Homepage</Link>
      </h1>
      <nav className={styles.navigationBar}>
        <HeaderLink to="/" activePath={activePath}>Home</HeaderLink>
        <HeaderLink to="/blog" activePath={activePath}>Blog</HeaderLink>
        <HeaderLink to="/about" activePath={activePath}>About</HeaderLink>
      </nav>
    </header>
  )
};

export function connectStateToProps({ routing: { locationBeforeTransitions: { pathname } } }) {
  return { activePath: pathname };
}

export default connect(connectStateToProps)(SiteHeader);
