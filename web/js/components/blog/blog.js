import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import ReactDisqusThread from 'react-disqus-thread';
import Spinner from '../spinner';
import RequestWentToShit from '../errors/requestWentToShit';
import { fetchBlogActionCreator } from '../../actions';
import styles from './blog.styl';

class Excerpts extends Component {
  componentDidMount() {
    const { fetchBlog, dispatch } = this.props;

    fetchBlog(dispatch);
  }

  render() {
    const { data, fetching, error, id }  = this.props;

    if (fetching)
      return <Spinner/>;

    if (error)
      return <RequestWentToShit status={data.response.status}/>;

    const { title, excerpt, text } = data;

    return (
      <article className={styles.blogPost}>
        <header>
          <h1>{title}</h1>
          <p>{excerpt}</p>
        </header>
        <ReactMarkdown source={text}/>
        <ReactDisqusThread shortname="test" identifier={id}/>
      </article>
    );
  }
}

export function mapStateToProps({ blog }) {
  return { ...blog };
}

export function mapDispatchToProps(dispatch, { params: { id } }) {
  return { fetchBlog: fetchBlogActionCreator(id), dispatch };
}

export function mergeProps(stateProps, dispatchProps, { params: { id }}) {
  return { ...stateProps, ...dispatchProps, id};
}

export default connect(mapStateToProps, mapDispatchToProps)(Excerpts)
