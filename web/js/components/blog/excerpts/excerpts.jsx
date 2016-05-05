import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { browserHistory } from 'react-router';
import Spinner from '../../spinner.jsx';
import { RequestWentToShit } from '../../errors.jsx';
import Excerpt from '../excerpt/excerpt.jsx';
import { fetchExcerpts, searchExcerpts } from '../../../actions';
import styles from './excerpts.styl';

export const Search = ({ ...props }) => <input role="search" type="search" {...props} placeholder="Search..."/>;

export class Excerpts extends Component {
  componentDidMount() {
    this.props.fetchExcerpts();
  }

  render() {
    const { data, fetching, error, search, handleSearch } = this.props;

    if (fetching)
      return <Spinner />;

    if (error)
      return <RequestWentToShit response={data.response}/>;

    if (data.length <= 0) {
      return (
        <div className={styles.excerpts}>
          <p>No blogs here :(</p>
          <p>Could be I havent written anything, or you could try searching for something other than</p>
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

export function mapStateToProps({ excerpts }) {
  return excerpts;
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchExcerpts: () => dispatch(fetchExcerpts())
  };
}

export function mergeProps({ data, ...stateProps }, { dispatch, ...dispatchProps }, { location: { search: unparsedLocationSearch }, ...ownProps }) {
  const { search = '' } = queryString.parse(unparsedLocationSearch);
  const actualSearch = search.toLowerCase();
  const filteredData = actualSearch ? data.filter(({ date, excerpt, tags, title }) => (
    title.toLowerCase().includes(actualSearch) ||
    tags.includes(actualSearch) ||
    !!tags.find(tag => tag.toLowerCase().includes(actualSearch)) ||
    excerpt.toLowerCase().includes(actualSearch) ||
    date.toLowerCase().includes(actualSearch)
  )) : data;

  return {
    ...stateProps,
    data: filteredData,
    ...dispatchProps,
    search,
    ...ownProps
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Excerpts);
