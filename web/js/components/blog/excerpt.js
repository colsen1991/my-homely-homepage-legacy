import React from 'react';
import { Link } from 'react-router';
import { blog } from '../../endpoints/endpoints';
import styles from './blog.styl';

export default ({ _id, title, excerpt }) => (
  <section className={styles.excerpt}>
    <header>
      <h1>
        <Link to={blog(_id)}>{title}</Link>
      </h1>
      <p>{excerpt}</p>
    </header>
  </section>
);
