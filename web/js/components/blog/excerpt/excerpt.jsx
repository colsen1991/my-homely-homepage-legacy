import React from 'react';
import { Link } from 'react-router';
import Tags from '../tags/tags.jsx';
import styles from './excerpt.styl';

export const Linkable = ({ linkable, to, children }) => {
  if (linkable) {
    return (
      <Link to={to} className={styles.linkable}>
        {children}
      </Link>
    );
  }

  return <div className={styles.linkable}>{children}</div>;
};

const Excerpt = ({ id, title, tags, date, excerpt, clickable, headerImageLink }) => {
  const formattedDate = new Date(date).toUTCString();

  return (
    <header className={styles.excerpt}>
      <Linkable to={`/blog/${id}`} linkable={clickable}>
        <h1>{title}</h1>
        <img src={headerImageLink} alt="Header"/>
      </Linkable>
      <address>
        Published on <time pubDate="pubDate" dateTime={formattedDate} title={formattedDate}>{formattedDate} </time>
        <Tags tags={tags} clickable={clickable}/>
      </address>
      <p>{excerpt}</p>
    </header>
  );
};

export default Excerpt;
