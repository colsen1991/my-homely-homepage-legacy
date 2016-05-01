import React from 'react';
import styles from './content.styl';

const Content = ({ children }) => (
  <main className={styles.content}>
    {children}
  </main>
);

export default Content;
