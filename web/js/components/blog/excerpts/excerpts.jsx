import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../spinner.jsx';
import { RequestWentToShit } from '../../errors.jsx';
import Excerpt from '../excerpt/excerpt.jsx';
import { fetchExcerpts } from '../../../actions';
import styles from './excerpts.styl';

export const Search = ({ ...props }) => <input role="search" type="search" {...props} placeholder="Search..."/>;

export class Excerpts extends Component {
  componentDidMount() {
    this.props.fetchExcerpts();
  }

  render() {
    const { data, fetching, error } = this.props;

    if (fetching)
      return <Spinner />;

    if (error)
      return <RequestWentToShit response={data.response}/>;

    if (data.length <= 0) {
      return (
        <div className={styles.excerpts}>
          <p>No blogs here :(</p>
          <p>Could be I haven't written anything, or you could try searching for something else...</p>
        </div>
      );
    }

    return (
      <div className={styles.excerpts}>
        {
          data.map((excerpt, index, arr) => (
            <section key={excerpt.id}>
              <Excerpt {...excerpt} showLine={arr} linkable disableTags/>
              {index !== (arr.length - 1) ? <hr className={styles.line} /> : null}
            </section>
          ))
        }
      </div>
    );
  }
}

export function mapStateToProps({ excerpts: { data, ...excerpts }, routing: { locationBeforeTransitions: { query: { search = '' } } } }) {
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
    ...excerpts
  };
}

export default connect(mapStateToProps, { fetchExcerpts })(Excerpts);
