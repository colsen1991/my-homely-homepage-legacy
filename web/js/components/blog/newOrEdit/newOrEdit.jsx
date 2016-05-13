import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  browserHistory,
  Link } from 'react-router';
import {
  fetchBlogForEditing,
  titleChanged,
  tagsChanged,
  headerImageLinkChanged,
  excerptChanged,
  textChanged,
  publishedChanged,
  saveBlog,
  changeTitle } from '../../../actions';
import Spinner from '../../spinner.jsx';
import { RequestWentToShit } from '../../errors.jsx';
import styles from './newOrEdit.styl';

export const NewOrEdit = ({
      saving,
      successSaving,
      errorSaving,
      save,
      handleTitleChange,
      handleTagsChange,
      handleHeaderImageLinkChange,
      handleExcerptChange,
      handleTextChange,
      handlePublishedChange,
      _id,
      data: {
        title,
        tags,
        excerpt,
        headerImageLink,
        text,
        published
      }
    }) => {
  if (saving)
    return <Spinner/>;

  if (successSaving && !_id)
    return <p className={styles.success}> Save successful! Wanna return to the <Link to="/admin">admin</Link> page?</p>;

  return (
    <form onSubmit={save} className={styles.newOrEditForm}>
      <input type="text" placeholder="Title..." defaultValue={title} onChange={handleTitleChange} required/>
      <input type="text" placeholder="Tags..." defaultValue={tags} onChange={handleTagsChange} required/>
      <input type="url" placeholder="Header image link..." defaultValue={headerImageLink} onChange={handleHeaderImageLinkChange} required/>
      <textarea placeholder="Excerpt..." defaultValue={excerpt} onChange={handleExcerptChange} required/>
      <textarea className={styles.postTextarea} placeholder="Text..." defaultValue={text} onChange={handleTextChange} required/>
      <label><input type="checkbox" defaultChecked={published} onChange={handlePublishedChange}/> Published?</label>
      <input type="submit" defaultValue="Save"/>
      {errorSaving ? <p className={styles.error}>An error occured when saving.Please try again...: (</p> : null}
      {successSaving ? <p className={styles.success}>Save was successful!: D</p> : null}
    </form>
  );
};

export class NewOrEditContainer extends Component {
  componentWillMount() {
    if (!this.props.loggedIn)
      browserHistory.push('/login');
  }

  componentDidMount() {
    const { params: { _id }, fetchBlog } = this.props;

    if (_id)
      fetchBlog(_id);
  }

  render() {
    const {
      fetching,
      errorFetching,
      data,
      params: { _id },
      ...rest
    } = this.props;

    if ((fetching && _id))
      return <Spinner/>;

    if ((errorFetching && _id))
      return <RequestWentToShit response={data.response}/>;

    return <NewOrEdit _id={_id} data={data} {...rest}/>;
  }
}

export function mapStateToProps({ blogForEditing: { data: { tags, ...data }, ...blogForEditing }, login: { loggedIn } }) {
  return {
    ...blogForEditing,
    data: {
      ...data,
      tags: tags.join(' ')
    },
    loggedIn
  };
}

export function mapDispatchToProps(dispatch, { params: { _id } }) {
  return {
    fetchBlog: () => dispatch(fetchBlogForEditing(_id)),
    saveWrapper: (blog) => event => {
      event.preventDefault();

      dispatch(saveBlog(blog, _id));
    },
    handleTitleChange: event => dispatch(titleChanged(event)),
    handleTagsChange: event => dispatch(tagsChanged(event)),
    handleHeaderImageLinkChange: event => dispatch(headerImageLinkChanged(event)),
    handleExcerptChange: event => dispatch(excerptChanged(event)),
    handleTextChange: event => dispatch(textChanged(event)),
    handlePublishedChange: event => dispatch(publishedChanged(event)),
    changeTitle: title => dispatch(changeTitle(title)),
  };
}

export function mergeProps({ data, name, ...stateProps }, { saveWrapper, ...dispatchProps }, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    data,
    save: saveWrapper({ ...data }),
    ...ownProps
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewOrEditContainer);
