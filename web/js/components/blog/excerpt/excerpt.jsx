import React from 'react';
import Tags from '../tags/tags.jsx';
import Linkable from '../../linkable/linkable.jsx';
import styles from './excerpt.styl';

const Excerpt = ({ id, title, tags, date, excerpt, linkable, headerImageLink }) => {
  const formattedDate = new Date(date).toUTCString().substr(0, 16);

  return (
    <header className={styles.excerpt}>
      <Linkable to={`/blog/${id}`} linkable={linkable}>
        <h1>{title}</h1>
        <img src={headerImageLink} alt="Header"/>
      </Linkable>
      <address>
        Published on <time pubDate="pubDate" dateTime={formattedDate} title={formattedDate}>{formattedDate} </time>
        <Tags tags={tags}/>
      </address>
      <p>{excerpt}</p>
    </header>
  );
};

export default Excerpt;
