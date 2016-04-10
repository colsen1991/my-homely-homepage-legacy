import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import RequestWentToShit from '../errors/requestWentToShit';
import Excerpt from './excerpt';
import { fetchExcerpts } from '../../actions';
import styles from './blog.styl';

class Excerpts extends Component {
  componentDidMount() {
    this.props.fetchExcerpts();
  }

  render() {
    const { data, fetching, error }  = this.props;

    if (fetching)
      return <Spinner/>;

    if (error)
      return <RequestWentToShit status={data.response.status}/>;

    if (data.length <= 0)
      return <p>No blogs here :(</p>;

    return (
      <div>
        {
          data.map((excerpt, index, arr) => (
            <section key={excerpt.id}>
              <Excerpt {...excerpt} showLine={arr}/>
              {index !== (arr.length - 1) ? <hr className={styles.line}/> : null}
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

export default connect(mapStateToProps, { fetchExcerpts })(Excerpts)
