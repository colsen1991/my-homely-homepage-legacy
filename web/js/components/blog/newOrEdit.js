import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogForEditing } from '../../actions';
import Spinner from '../spinner';
import RequestWentToShit from '../errors/requestWentToShit';
import styles from './blog.styl';

export class NewOrEdit extends Component {
  componentWillMount() {
    const { id, fetchBlog } = this.props;

    if (id)
      fetchBlog(id);
  }

  render() {
    const { fetching, errorFetching, saving, errorSaving, data } = this.props;

    if (fetching || saving)
      return <Spinner/>;

    if (errorFetching)
      return <RequestWentToShit status={data.response.status}/>;

    return (
      <form onSubmit={() => ({})}>
        <input type="text" placeholder="Title..." disabled={saving} required/>
        <input type="submit" value="Save" disabled={saving}/>
        {errorSaving ? <p className={styles.error}>An error occured when saving. Please try again... :(</p> : null}
      </form>
    );
  }
}

export function mapStateToProps({ forEditing }) {
  return { ...forEditing };
}

export function mapDispatchToProps(dispatch, { id }) {
    return { fetchBlog: () => dispatch(fetchBlogForEditing(id)) };
}

export default connect(undefined, mapDispatchToProps)(NewOrEdit);
