import React from 'react';
import styles from './content.styl';

export default ({ children }) => (
  <main className={styles.content}>
    {children}
  </main>
);
