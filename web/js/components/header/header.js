import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import store, { setActiveUrl } from './../../store/store.js';
import styles from './header.styl';

function isLinkActive(to, activeUrl) {
  if (to === '/')
    return to === activeUrl;

  return activeUrl.indexOf(to) >= 0;
}

const HeaderLink = ({ to, activeUrl, children }) => {
  const activeLink = isLinkActive(to, activeUrl);
  const props = {
    className: classNames({
      [styles.activeLink]: activeLink,
      [styles.inactiveLink]: !activeLink
    }),
    onClick: () => setActiveUrl(to),
    to
  };

  return <Link {...props}>{children}</Link>;
};


export default observer(() => {
  const { activeUrl } = store;

  return (
    <div className={styles.siteHeader}>
      <header>
        <h1>
          <Link onClick={() => setActiveUrl('/')} to="/">My Homely Homepage</Link>
        </h1>
      </header>
      <nav className={styles.navigationBar}>
        <HeaderLink to="/" activeUrl={activeUrl}>Home</HeaderLink>
        <HeaderLink to="/blog" activeUrl={activeUrl}>Blog</HeaderLink>
        <HeaderLink to="/about" activeUrl={activeUrl}>About</HeaderLink>
      </nav>
    </div>
  )
});
