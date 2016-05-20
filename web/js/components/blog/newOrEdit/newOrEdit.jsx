import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  browserHistory,
  Link } from 'react-router';
import {
  fetchBlogPostForEditing,
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

class NewOrEdit extends Component {
  componentDidMount() {
    const { changeTitle, _id, data: { title } } = this.props;

    if (changeTitle) {
      if (_id)
        changeTitle(`Edit ${title}`);
      else
        changeTitle('New');
    }
  }

  render() {
    const {
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
    } = this.props;

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
  }
}

export class NewOrEditContainer extends Component {
  componentWillMount() {
    if (!this.props.loggedIn)
      this.props.changeLocation('/login');
  }

  componentDidMount() {
    const { params: { _id }, fetchBlogPost } = this.props;

    if (_id)
      fetchBlogPost(_id);
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

export function mapStateToProps({ blogPostForEditing: { data: { tags, ...data }, ...blogPostForEditing }, login: { loggedIn } }) {
  return {
    ...blogPostForEditing,
    data: {
      ...data,
      tags: tags.join(' ')
    },
    loggedIn
  };
}

export function mapDispatchToProps(dispatch, { params: { _id } }) {
  return {
    fetchBlogPost: () => dispatch(fetchBlogPostForEditing(_id)),
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
    changeLocation: browserHistory.push
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
