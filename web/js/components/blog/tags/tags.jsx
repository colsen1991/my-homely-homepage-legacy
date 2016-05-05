import React from 'react';
import { Link } from 'react-router';
import styles from './tags.styl';

const Tags = ({ tags, disabled }) => (
  <span className={styles.tags}>
    in {tags.map((tag, i) => <Link to={`/blog?search=${tag}`} value={tag} role="button" key={`${i}-${tag}`} disabled={disabled ? 'disabled' : ''}>#{tag} </Link>)}
  </span>
);

export default Tags;
