import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Excerpt from '../excerpt/excerpt.jsx';
import Comments from '../comments/comments.jsx';
import Spinner from '../../spinner.jsx';
import { RequestWentToShit } from '../../errors.jsx';
import { fetchBlog, changeTitle } from '../../../actions';
import styles from './post.styl';

export class Post extends Component {
  componentDidMount() {
    const { changeTitle, data: { title } } = this.props;

    if (changeTitle) changeTitle(title);
  }

  render() {
    const { id, data: { text, ...excerpt } } = this.props;

    return (
      <article className={styles.blog}>
        <Excerpt id={id} {...excerpt}/>
        <ReactMarkdown source={text}/>
        <Comments shortname="test" identifier={id}/>
      </article>
    );
  }
}

export class PostContainer extends Component {
  componentDidMount() {
    const { fetchBlog, params: { id } } = this.props;

    fetchBlog(id);
  }

  render() {
    const { data, fetching, error, id, changeTitle } = this.props;

    if (fetching)
      return <Spinner/>;

    if (error)
      return <RequestWentToShit response={data.response}/>;

    return <Post data={data} id={id} changeTitle={changeTitle}/>;
  }
}

export function mapStateToProps({ blog }) {
  return { ...blog };
}

export default connect(mapStateToProps, { fetchBlog, changeTitle })(PostContainer);
