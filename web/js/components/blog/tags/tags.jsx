import React from 'react';
import styles from './tags.styl';

// TODO Add onClick which triggers search.
const Tags = ({ tags, clickable }) => (
  <span className={styles.tags}>in {tags.map((tag, i) => <a href="#" role="button" key={`${i}-${tag}`} disabled={clickable ? '' : 'disabled'}>{tag} </a>)}</span>
);

export default Tags;
