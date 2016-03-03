import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import RequestWentToShit from '../requestWentToShit';
import Excerpt from './excerpt';
import { fetchExcerptsActionCreator } from '../../actions';

class Excerpts extends Component {
  componentDidMount() {
    this.props.fetchExcerpts();
  }

  render() {
    const { data, fetching, error }  = this.props;

    if (fetching)
      return <Spinner/>

    if (error) {
      const { response } = data;
      const { status } = response;
      return <RequestWentToShit status={status}/>
    }

    return (
      <div>
        {
          data.length !== 0
            ? data.map(excerpt => <Excerpt {...excerpt} key={excerpt.id}/>)
            : <p>No blogs here :(</p>
        }
      </div>
    );
  }
}

export function mapStateToProps({ excerpts }) {
  return { ...excerpts };
}

export default connect(mapStateToProps, { fetchExcerpts: fetchExcerptsActionCreator })(Excerpts)
