import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner.jsx';
import RequestWentToShit from '../errors/requestWentToShit.jsx';
import Excerpt from './excerpt.jsx';
import { fetchExcerpts } from '../../actions';
import styles from './blog.styl';

class Excerpts extends Component {
  componentDidMount() {
    this.props.fetchExcerpts();
  }

  render() {
    const { data, fetching, error } = this.props;

    if (fetching)
      return <Spinner />;

    if (error)
      return <RequestWentToShit status={data.response.status}/>;

    if (data.length <= 0)
      return <p>No blogs here :(</p>;

    return (
      <div>
        {
          data.map((excerpt, index, arr) => (
            <section key={excerpt.id}>
              <Excerpt {...excerpt} showLine={arr} />
              {index !== (arr.length - 1) ? <hr className={styles.line} /> : null}
            </section>
          ))
        }
      </div>
    );
  }
}

export function mapStateToProps({ excerpts }) {
  return { ...excerpts };
}

export default connect(mapStateToProps, { fetchExcerpts })(Excerpts);
