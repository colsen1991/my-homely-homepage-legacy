import React from 'react';
import { Link } from 'react-router';
import styles from './linkable.styl';

const Linkable = ({ linkable, to, children }) => {
  if (linkable) {
    return (
      <Link to={to} className={styles.linkable}>
        {children}
      </Link>
    );
  }

  return <div className={styles.linkable}>{children}</div>;
};

export default Linkable;
