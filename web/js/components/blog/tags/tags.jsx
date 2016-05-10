import React from 'react';
import { Link } from 'react-router';
import styles from './tags.styl';

const Tags = ({ tags }) => (
  <span className={styles.tags}>
    in {tags.map((tag, i) => <Link to={`/blog?search=${encodeURIComponent(tag)}`} key={`${i}-${tag}`}>{tag} </Link>)}
  </span>
);

export default Tags;
