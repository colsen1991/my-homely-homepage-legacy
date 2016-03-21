import React from 'react';
import { Link } from 'react-router';
import styles from './blog.styl';

export const Linkable = ({ linkable, to, children }) => {
  if (linkable) {
    return (
      <Link to={to} className={styles.linkable}>
        {children}
      </Link>
    )
  }

  return <div>{children}</div>;
};

export default ({ id, title, date, excerpt, author, linkable = true, headerImageLink, showLine }) => {
  const formattedDate = new Date(date).toUTCString();

  return (
    <header className={styles.excerpt}>
      <Linkable to={`/blog/${id}`} linkable={linkable}>
        <img src={headerImageLink} alt="Image yo" style={{width: '100%'}}/>
        <h1>{title}</h1>
      </Linkable>
      <address>Published on
        <time pubDate dateTime={formattedDate} title={formattedDate}>{formattedDate}</time> by <Link rel="author" to="/about">{author}</Link></address>
      <p>{excerpt}</p>
    </header>
  );
};

