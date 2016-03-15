import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import RequestWentToShit from '../errors/requestWentToShit';
import Excerpt from './excerpt';
import { fetchExcerptsActionCreator } from '../../actions';
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

    return (
      <div>
        {
          data.length !== 0 ? data.map((excerpt, index, arr) => (
            <div className={styles.excerptListWrapper}>
              <Excerpt {...excerpt} key={excerpt.id} showLine={arr}/>{index !== (arr.length - 1) ? <hr className={styles.line}/> : null}
            </div>
          )) : <p>No blogs here :(</p>
        }
      </div>
    );
  }
}

export function mapStateToProps({ excerpts }) {
  return { ...excerpts };
}

export default connect(mapStateToProps, { fetchExcerpts: fetchExcerptsActionCreator })(Excerpts)
