import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner.jsx';
import { RequestWentToShit } from '../errors.jsx';
import Excerpt from './excerpt/excerpt.jsx';
import { fetchBlog, changeTitle } from '../../actions';

export class Blog extends Component {
  componentDidMount() {
    const { changeTitle } = this.props;

    if (changeTitle)
      changeTitle('Blog');
  }

  render() {
    const data = this.props.data;

    if (data.length <= 0) {
      return (
        <div>
          <p>No blogs here :(</p>
          <p>Could be I haven't written anything, or you could try searching for something else...</p>
        </div>
      );
    }

    return (
      <div>
        {
          data.map((excerpt, index, arr) => (
            <section key={excerpt.id}>
              <Excerpt {...excerpt} showLine={arr} linkable/>
              {index !== (arr.length - 1) ? <hr/> : null}
            </section>
          ))
        }
      </div>
    );
  }
}

export class BlogContainer extends Component {
  componentDidMount() {
    this.props.fetchBlog();
  }

  render() {
    const { data, fetching, error, changeTitle } = this.props;

    if (fetching)
      return <Spinner/>;

    if (error)
      return <RequestWentToShit response={data.response}/>;

    return <Blog data={data} changeTitle={changeTitle}/>;
  }
}

export function mapStateToProps({ blog: { data, ...blog }, routing: { locationBeforeTransitions: { query: { search = '' } } } }) {
  const actualSearch = search.toLowerCase();
  const filteredData = actualSearch ? data.filter(({ date, excerpt, tags, title }) => (
    title.toLowerCase().includes(actualSearch) ||
    tags.includes(actualSearch) ||
    !!tags.find(tag => tag.toLowerCase().includes(actualSearch)) ||
    excerpt.toLowerCase().includes(actualSearch) ||
    date.toLowerCase().includes(actualSearch)
  )) : data;

  return {
    data: filteredData,
    ...blog
  };
}

export default connect(mapStateToProps, { fetchBlog, changeTitle })(BlogContainer);
