import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Excerpt from './excerpt';
import { getExcerpts, blog } from './../../store/store';
import styles from './blog.styl';


export const Excerpts = observer(({ store: { excerpts } }) => (
  <div className={styles.blogs}>
    {excerpts.map(excerpt => <Excerpt {...excerpt} key={excerpt._id}/>)}
  </div>
));

export default class ExcerptsWrapper extends Component {
  componentDidMount() {
    getExcerpts();
  }

  render() {
    return <Excerpts store={blog}/>
  }
}
