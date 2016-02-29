import React from 'react';
import { Link } from 'react-router';
import { blog } from '../../endpoints/endpoints';
import styles from './blog.styl';

export default ({ _id, title, excerpt }) => (
  <section className={styles.excerpt}>
    <Link to={blog(_id)}>
      <header>
        <h2>{title}</h2>
        <p>{excerpt}</p>
      </header>
    </Link>
  </section>
);
