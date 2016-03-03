import React, { createClass } from 'react';
/*
 import ReactMarkdown from 'react-markdown';
 import Spinner from '../spinner';
 import RequestWentToShit from '../requestWentToShit';
 import ReactDisqusThread from 'react-disqus-thread';
 import store, { getBlogPost, setBlogPost } from '../../store/store';
 import styles from './blog.styl';
 */

export default ({ id, title, excerpt, text }) => {
  return <div>blogs here!</div>;
};

/*(
 <article className={styles.blogPost}>
 <header>
 <h1>{title}</h1>
 <p>{excerpt}</p>
 </header>
 <ReactMarkdown source={text}/>
 <ReactDisqusThread shortname="test" identifier={id}/>
 </article>
 );*/

/*
 export default observer(createClass({
 componentDidMount() {
 this.ajaxCallFinished = false;

 getBlogPost(this.props.params.id)
 .then(blogPost => {
 this.ajaxCallFinished = true;
 this.ajaxCallStatus = 200;
 setBlogPost(blogPost);
 })
 .catch(error => {
 this.ajaxCallFinished = true;
 this.ajaxCallStatus = error.response.status;
 setBlogPost({ id: '3123213' })
 })
 },

 render() {
 const blogPosts = store.blogPosts;

 if (this.ajaxCallFinished) {
 if (this.ajaxCallStatus === 200) {
 const { id, title, excerpt, text } = blogPosts.find(blogPost => blogPost.id === this.props.params.id) || {};
 const props = {
 id,
 title,
 excerpt,
 text
 };

 return <Blog {...props}/>;
 }

 return <RequestWentToShit/>;
 }

 return <Spinner/>;
 }
 }));
 */
