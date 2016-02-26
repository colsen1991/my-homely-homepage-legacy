import React from 'react';
import styles from './content.styl'

export default ({ children }) => (
  <div className={styles.content}>
    {children}
  </div>
);
