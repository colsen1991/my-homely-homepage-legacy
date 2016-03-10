import React from 'react';
import { Link } from 'react-router';
import styles from './blog.styl';

export default ({ id, title, date, excerpt }) => (
  <section className={styles.excerpt}>
    <header>
      <h1>
        <Link to={`/blog/${id}`}>{title}</Link>
      </h1>
      <span>Published on <time pubDate dateTime={date} title={date}>{date}</time></span>
      <p>{excerpt}</p>
    </header>
  </section>
);
