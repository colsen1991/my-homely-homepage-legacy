import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Excerpt from './excerpt';
import Comments from '../comments/comments';
import Spinner from '../spinner';
import RequestWentToShit from '../errors/requestWentToShit';
import { fetchBlog } from '../../actions';
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

    const { text, ...excerpt } = data;

    return (
      <article className={styles.blog}>
        <Excerpt id={id} linkable={false} {...excerpt}/>
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
  return { fetchBlog: () => dispatch(fetchBlog(id)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
