import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
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
    //onClick: () => setActiveUrl(to),
    to
  };

  return <Link {...props}>{children}</Link>;
};


export default () => {
  return (
    <div className={styles.siteHeader}>
      <header>
        <h1>
          <Link /*onClick={() => setAcetiveUrl('/')}*/ to="/">My Homely Homepage</Link>
        </h1>
      </header>
      <nav className={styles.navigationBar}>
        <HeaderLink to="/" activeUrl="/">Home</HeaderLink>
        <HeaderLink to="/blog" activeUrl="/">Blog</HeaderLink>
        <HeaderLink to="/about" activeUrl="/">About</HeaderLink>
      </nav>
    </div>
  )
};
