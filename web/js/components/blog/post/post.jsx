import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Excerpt from '../excerpt/excerpt.jsx';
import Comments from '../../comments/comments.jsx';
import Spinner from '../../spinner.jsx';
import { RequestWentToShit } from '../../errors.jsx';
import { fetchBlog } from '../../../actions';
import styles from './post.styl';

export class Blog extends Component {
  componentDidMount() {
    this.props.fetchBlog();
  }

  render() {
    const { data, fetching, error, id } = this.props;

    if (fetching)
      return <Spinner/>;

    if (error)
      return <RequestWentToShit response={data.response}/>;

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

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
