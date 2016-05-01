import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { fetchBlogForEditing, titleChanged, headerImageLinkChanged, excerptChanged, textChanged, publishedChanged, saveBlog } from '../../../actions';
import Spinner from '../../spinner.jsx';
import { RequestWentToShit } from '../../errors.jsx';
import styles from './newOrEdit.styl';

export class NewOrEdit extends Component {
  componentWillMount() {
    const { loggedIn } = this.props;

    if (!loggedIn)
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
      save,
      saving,
      successSaving,
      errorSaving,
      data,
      handleTitleChange,
      handleHeaderImageLinkChange,
      handleExcerptChange,
      handleTextChange,
      handlePublishedChange,
      params: { _id }
    } = this.props;

    if (successSaving && !_id)
      return <p className={styles.success}> Save successful! Wanna return to the <Link to="/admin">admin</Link> page?</p>;

    if ((fetching && _id) || saving)
      return <Spinner/>;

    if ((errorFetching && _id))
      return <RequestWentToShit response={data.response}/>;

    const { title, excerpt, headerImageLink, text, published } = data;

    return (
      <form onSubmit={save} className={styles.newOrEditForm}>
        <input type="text" placeholder="Title..." disabled={saving} defaultValue={title} onChange={handleTitleChange} required/>
        <input type="url" placeholder="Header image link..." disabled={saving} defaultValue={headerImageLink} onChange={handleHeaderImageLinkChange} required/>
        <textarea placeholder="Excerpt..." defaultValue={excerpt} onChange={handleExcerptChange} required/>
        <textarea className={styles.postTextarea} placeholder="Text..." defaultValue={text} onChange={handleTextChange} required/>
        <label><input type="checkbox" defaultChecked={published} onChange={handlePublishedChange}/> Published?</label>
        <input type="submit" defaultValue="Save" disabled={saving}/>
        {errorSaving ? <p className={styles.error}>An error occured when saving.Please try again...: (</p> : null}
        {successSaving ? <p className={styles.success}>Save was successful!: D</p> : null}
      </form>
    );
  }
}

export function mapStateToProps({ blogForEditing, login: { name, loggedIn } }) {
  return { ...blogForEditing, name, loggedIn };
}

export function mapDispatchToProps(dispatch, { params: { _id } }) {
  return {
    fetchBlog: () => dispatch(fetchBlogForEditing(_id)),
    saveWrapper: (blog) => event => {
      event.preventDefault();

      dispatch(saveBlog(blog, _id));
    },
    handleTitleChange: (event) => dispatch(titleChanged(event)),
    handleHeaderImageLinkChange: (event) => dispatch(headerImageLinkChanged(event)),
    handleExcerptChange: (event) => dispatch(excerptChanged(event)),
    handleTextChange: (event) => dispatch(textChanged(event)),
    handlePublishedChange: (event) => dispatch(publishedChanged(event)),
  };
}

export function mergeProps({ data, name, ...stateProps }, { saveWrapper, ...dispatchProps }, ownProps) {
  const author = data.author || name;

  return {
    ...stateProps,
    ...dispatchProps,
    data,
    save: saveWrapper({ ...data, author }),
    ...ownProps
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewOrEdit);
