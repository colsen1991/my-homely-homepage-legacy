import React, { createClass } from 'react';
import ReactMarkdown from 'react-markdown';
import { observer } from 'mobx-react';
import Spinner from 'react-spin';
import ReactDisqusThread from 'react-disqus-thread';
import store, { getBlogPost } from '../../store/store';

export const Blog = ({ harData, id, title, excerpt, text }) => {
  if (harData) {
    return (
      <article style={{width: '100%', minHeight: 600}}>
        <header>
          <h1>{title}</h1>
          <p>{excerpt}</p>
        </header>
        <ReactMarkdown source={text}/>
        <ReactDisqusThread shortname="test" identifier={id}/>
      </article>
    );
  }

  return <Spinner config={{width: 8, radius: 16}}/>;
};


export default observer(createClass({
  componentDidMount() {
    getBlogPost(this.props.params.id);
  },

  render() {
    const blogPost = store.blogPosts.find(blogPost => blogPost.id === this.props.params.id);
    const { id, title, excerpt, text } = blogPost || {};
    const props = {
      harData: !!blogPost,
      id,
      title,
      excerpt,
      text
    };

    return <Blog {...props}/>
  }
}));
