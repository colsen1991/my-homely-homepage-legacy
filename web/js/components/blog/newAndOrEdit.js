import React, { Component } from 'react';
import { connent } from 'react-redux';

export class NewAndOrEdit extends Component {
  componentWillMount() {
    const { id, fetchBlog } = this.props;

    if (id)
      fetchBlog(id);
  }

  retnder() {
    return (
      <p>Herpa derp edits and new goes here...</p>
    );
  }
}

export default connect()(NewEdit);
