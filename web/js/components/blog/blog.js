import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import Comments from '../comments/comments';
import Spinner from '../spinner';
import RequestWentToShit from '../errors/requestWentToShit';
import { fetchBlogActionCreator } from '../../actions';
import styles from './blog.styl';

class Blog extends Component {
  componentDidMount() {
    this.props.fetchBlog();
  }

  render() {
    const { data, fetching, error, id }  = this.props;

    if (fetching)
      return <Spinner/>;

    if (error)
      return <RequestWentToShit status={data.response.status}/>;

    const { title, date, author, excerpt, text } = data;

    return (
      <article className={styles.blogPost}>
        <header>
          <h1>{title}</h1>
          <address>Published on <time pubDate dateTime={date} title={date}>{date}</time> by <Link rel="author" to="/about">{author}</Link></address>
          <p>{excerpt}</p>
        </header>
        <ReactMarkdown source={text}/>
        <Comments shortname="test" identifier={id}/>
      </article>
    );
  }
}

export function mapStateToProps({ blog }) {
  return { ...blog };
}

export function mapDispatchToProps(dispatch, { params: { id } }) {
  return { fetchBlog: () => fetchBlogActionCreator(id)(dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
