import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../spinner.jsx';
import { RequestWentToShit } from '../../errors.jsx';
import Excerpt from '../excerpt/excerpt.jsx';
import { fetchExcerpts, searchExcerpts } from '../../../actions';
import styles from './excerpts.styl';

export const Search = ({ handleSearch }) => <input role="search" type="search" onKeyUp={handleSearch} placeholder="Search..."/>;

export class Excerpts extends Component {
  componentDidMount() {
    this.props.fetchExcerpts();
  }

  componentWillReceiveProps(nextProp) {
    const { fetching, error, data, location: { search: locationSearch }, search } = nextProp;
    if (!fetching && !error && data.length > 0) {
      const [name, val] = locationSearch.split('=');

      if (name.substr(1) === search && val)
        this.props.handleSearch(locationSearch);
    }
  }

  render() {
    const { data, fetching, error, handleSearch } = this.props;

    if (fetching)
      return <Spinner />;

    if (error)
      return <RequestWentToShit response={data.response}/>;

    if (data.length <= 0) {
      return (
        <div className={styles.excerpts}>
          <Search handleSearch={handleSearch}/>
          <p>No blogs here: (</p>
        </div>
      );
    }

    return (
      <div className={styles.excerpts}>
        <Search handleSearch={handleSearch}/>
        {
          data.map((excerpt, index, arr) => (
            <section key={excerpt.id}>
              <Excerpt {...excerpt} clickable showLine={arr} />
              {index !== (arr.length - 1) ? <hr className={styles.line} /> : null}
            </section>
          ))
        }
      </div>
    );
  }
}

export function mapStateToProps({ excerpts: { data, search, ...excerpts } }) {
  const actualSearch = search.toLowerCase();
  const filteredData = actualSearch ? data.filter(({ date, excerpt, tags, title }) => (
    title.toLowerCase().includes(actualSearch) ||
    tags.includes(actualSearch) ||
    !!tags.find(tag => tag.toLowerCase().includes(actualSearch)) ||
    excerpt.toLowerCase().includes(actualSearch) ||
    date.toLowerCase().includes(actualSearch)
  )) : data;

  return {
    ...excerpts,
    data: filteredData,
    search,
    handleSearchWrapper: dispatch => event => {
      const which = event.which;

      if (typeof event === 'string' || which === 13 || which === 27)
        return dispatch(searchExcerpts(event));

      return null;
    }
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchExcerpts: () => dispatch(fetchExcerpts()),
    dispatch
  };
}

export function mergeProps({ handleSearchWrapper, ...stateProps }, { dispatch, ...dispatchProps }, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    handleSearch: handleSearchWrapper(dispatch),
    ...ownProps
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Excerpts);
