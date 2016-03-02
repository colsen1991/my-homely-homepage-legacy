import React, { createClass } from 'react';
import { observer } from 'mobx-react';
import RequestWentToShit from '../requestWentToShit';
import Spinner from '../spinner';
import Excerpt from './excerpt';
import store, { getBlogExcerpts, setBlogExcerpts } from './../../store/store';

export const Excerpts = ({ excerpts }) => (
  <div>
    {excerpts.map(excerpt => <Excerpt {...excerpt} key={excerpt.id}/>)}
  </div>
);

export default observer(createClass({
  componentDidMount() {
    this.ajaxCallFinished = false;

    getBlogExcerpts()
      .then(blogExcepts => {
        this.ajaxCallFinished = true;
        this.ajaxCallStatus = 200;
        setBlogExcerpts(blogExcepts);
      })
      .catch(error => {
        this.ajaxCallFinished = true;
        this.ajaxCallStatus = error.response.status;
        setBlogExcerpts([]);
      });
  },

  render() {
    const blogExcerpts = store.blogExcerpts;

    if (this.ajaxCallFinished) {
      if (this.ajaxCallStatus === 200)
          return <Excerpts excerpts={blogExcerpts}/>;

      return <RequestWentToShit status={this.ajaxCallStatus}/>
    }

    return <Spinner/>;
  }
}));
