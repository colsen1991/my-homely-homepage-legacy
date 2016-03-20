import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchBlogForEditing,
  titleChanged,
  headerImageLinkChanged,
  excerptChanged,
  textChanged,
  publishedChanged
} from '../../actions';
import Spinner from '../spinner';
import RequestWentToShit from '../errors/requestWentToShit';
import styles from './blog.styl';

export class NewOrEdit extends Component {
  componentWillMount() {
    const { params: { id }, fetchBlog } = this.props;

    if (id)
      fetchBlog(id);
  }

  render() {
    const {
      fetching,
      errorFetching,
      saving,
      errorSaving,
      data,
      handleTitleChange,
      handleHeaderImageLinkChange,
      handleExcerptChange,
      handleTextChange,
      handlePublishedChange,
      params: { id }
    } = this.props;

    if ((fetching && id) || saving)
      return <Spinner/>;

    if ((errorFetching && id))
      return <RequestWentToShit status={data.response.status}/>;

    const { title, excerpt, headerImageLink, text, published } = data;

    return (
      <form onSubmit={() => ({})} className={styles.newOrEditForm}>
        <input type="text" placeholder="Title..." disabled={saving} defaultValue={title} onChange={handleTitleChange} required/>
        <input type="url" placeholder="Header image link..." disabled={saving} defaultValue={headerImageLink} onChange={handleHeaderImageLinkChange} required/>
        <textarea placeholder="Excerpt..." defaultValue={excerpt} onChange={handleExcerptChange} required/>
        <textarea className={styles.postTextarea} placeholder="Text..." defaultValue={text} onChange={handleTextChange} required/>
        <label><input type="checkbox" defaultChecked={published} onChange={handlePublishedChange}/> Published?</label>
        <input type="submit" defaultValue="Save" disabled={saving}/>
        {errorSaving ? <p className={styles.error}>An error occured when saving. Please try again... :(</p> : null}
      </form>
    );
  }
}

export function mapStateToProps({ blogForEditing }) {
  return { ...blogForEditing };
}

export function mapDispatchToProps(dispatch, { params: { id } }) {
  return {
    fetchBlog: () => dispatch(fetchBlogForEditing(id)),
    handleTitleChange: (event) => dispatch(titleChanged(event)),
    handleHeaderImageLinkChange: (event) => dispatch(headerImageLinkChanged(event)),
    handleExcerptChange: (event) => dispatch(excerptChanged(event)),
    handleTextChange: (event) => dispatch(textChanged(event)),
    handlePublishedChange: (event) => dispatch(publishedChanged(event))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrEdit);
