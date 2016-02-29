import React, { createClass } from 'react';
import { observer } from 'mobx-react';
import Excerpt from './excerpt';
import { getBlogs, state as blogState } from '../../state/blog';

export default observer(createClass({
  componentDidMount() {
    getBlogs();
  },

  render() {
    const { excerpts } = blogState;

    return (
      <section>
        <header>
          <h1>Blogs</h1>
        </header>
        <div>
          {excerpts.map(excerpt => <Excerpt {...excerpt} key={excerpt._id}/>)}
        </div>
      </section>
    );
  }
}));
