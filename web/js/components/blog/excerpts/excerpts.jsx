import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../spinner.jsx';
import { RequestWentToShit } from '../../errors.jsx';
import Excerpt from '../excerpt/excerpt.jsx';
import { fetchExcerpts } from '../../../actions';
import styles from './excerpts.styl';

// TODO Pull out (that's what she said) search input, connect, commit on enter and componentDidMount if search is present as url param.

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

    if (data.length <= 0)
      return <p>No blogs here: (</p>;

    return (
      <div className={styles.excerpts}>
        <input role="search" type="search" placeholder="Search..."/>
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
  const filteredData = data.filter(({ date, excerpt, tags, title }) => (
    title.toLowerCase().includes(actualSearch) ||
    tags.includes(actualSearch) ||
    !!tags.find(tag => tag.toLowerCase().includes(actualSearch)) ||
    excerpt.toLowerCase().includes(actualSearch) ||
    date.toLowerCase().includes(actualSearch)
  ));

  return { ...excerpts, data: filteredData };
}

export default connect(mapStateToProps, { fetchExcerpts })(Excerpts);
