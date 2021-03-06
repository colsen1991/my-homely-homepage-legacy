import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllBlogPosts, changeTitle } from '../../actions';
import Spinner from '../spinner.jsx';
import { RequestWentToShit } from '../errors.jsx';
import { sortByDate } from '../../util/arrayUtils';
import styles from './admin.styl';

export const BlogPostsTable = ({ data }) => (
  <table>
    <thead>
      <tr>
        <td><strong>Title</strong></td>
        <td><strong>Date Written</strong></td>
        <td><strong>Published</strong></td>
      </tr>
    </thead>
    <tbody>
      {
        data.map(({ _id, title, date, published }) => (
          <tr key={_id}>
            <td><Link onlyActiveOnIndex={false} to={`/blog/edit/${_id}`}>{title}</Link></td>
            <td>{new Date(date).toUTCString().substr(0, 16)}</td>
            <td>{published ? 'Yes' : 'No'}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

export class Admin extends Component {
  componentDidMount() {
    const { changeTitle } = this.props;

    if (changeTitle)
      changeTitle('Admin');
  }

  render() {
    const { data } = this.props;

    return (
      <div className={styles.admin}>
        <Link onlyActiveOnIndex={false} to="/blog/new" className={styles.newBlogLink}>Write new blog post?</Link>
        <BlogPostsTable data={data}/>
      </div>
    );
  }
}

export class AdminContainer extends Component {
  componentWillMount() {
    const { loggedIn, changeLocation } = this.props;

    if (!loggedIn)
      changeLocation('/login');
  }

  componentDidMount() {
    if (this.props.loggedIn)
      this.props.fetchAllBlogPosts();
  }

  render() {
    const { fetching, error, data, changeTitle } = this.props;

    if (fetching)
      return <Spinner/>;

    if (error)
      return <RequestWentToShit response={data.response}/>;

    return <Admin data={data} changeTitle={changeTitle}/>;
  }
}

function mapStateToProps({ login: { loggedIn }, allBlogPosts: { data, ...allBlogPosts } }) {
  return {
    loggedIn,
    ...allBlogPosts,
    data: data.sort ? data.sort(sortByDate) : data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllBlogPosts: () => dispatch(fetchAllBlogPosts()),
    changeTitle: title => dispatch(changeTitle(title)),
    changeLocation: browserHistory.push
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
