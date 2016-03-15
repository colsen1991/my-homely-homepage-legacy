import React, { Component } from 'react';
import {
  Link,
  browserHistory
} from 'react-router';
import { connect } from 'react-redux';
import { fetchAllBlogs } from '../../actions';
import Spinner from '../spinner';
import RequestWentToShit from '../errors/requestWentToShit';
import styles from './admin.styl';

function sortByDate({ date: a }, { date: b }) {
  return new Date(a).getTime() - new Date(b).getTime();
}

export const BlogTable = ({ blogs }) => {
  return (
    <table>
      <thead>
      <tr>
        <td><strong>Title</strong></td>
        <td><strong>Date</strong></td>
        <td><strong>Published</strong></td>
      </tr>
      </thead>
      <tbody>
      {
        blogs.sort(sortByDate).map(({ id, title, date, published }) => {
          return (
            <tr key={id}>
              <td><Link to={`/editBlog/${id}`}>{title}</Link></td>
              <td>{new Date(date).toUTCString()}</td>
              <td>{published ? 'Yes' : 'No'}</td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
};

export class Admin extends Component {
  componentWillMount() {
    if (!this.props.loggedIn)
      browserHistory.push('/login');
  }

  componentDidMount() {
    if (this.props.loggedIn)
      this.props.fetchAllBlogs();
  }

  render() {
    const { fetching, error, data } = this.props;

    if (fetching)
      return <Spinner/>;

    if (error)
      return <RequestWentToShit status={data.response.status}/>;

    return (
      <div className={styles.admin}>
        <Link to="/newBlog" className={styles.newBlogLink}>Write new Blog post</Link>
        <BlogTable blogs={data}/>
      </div>
    );
  }
}

function mapStateToProps({ login: { loggedIn }, allBlogs }) {
  return { loggedIn, ...allBlogs };
}

export default connect(mapStateToProps, { fetchAllBlogs: fetchAllBlogs })(Admin);
