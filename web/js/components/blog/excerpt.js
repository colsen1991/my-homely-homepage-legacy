import React from 'react';
import { Link } from 'react-router';
import styles from './blog.styl';

export default ({ id, title, excerpt }) => (
  <section className={styles.excerpt}>
    <header>
      <h1>
        <Link to={`/blog/e${id}`}>{title}</Link>
      </h1>
      <p>{excerpt}</p>
    </header>
  </section>
);
