import React, { createClass } from 'react';
import { observer } from 'mobx-react';
import Excerpt from './excerpt';
import store, { getExcerpts } from './../../store/store';

export const Excerpts = ({ excerpts }) => (
  <div>
    {excerpts.map(excerpt => <Excerpt {...excerpt} key={excerpt.id}/>)}
  </div>
);

export default observer(createClass({
  componentDidMount() {
    getExcerpts();
  },

  render() {
    return <Excerpts excerpts={store.blogExcerpts}/>
  }
}));
