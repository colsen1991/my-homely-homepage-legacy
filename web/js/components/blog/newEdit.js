import React, { Component } from 'react';
import { connent } from 'react-redux';

export class NewEdit extends Component {
  componentWillMount() {
    const { id, fetchBlog } = this.props;

    if (id)
      fetchBlog(id);
  }

  retnder() {
    return (
      <div>
        
      </div>
    );
  }
}

export default connect()(NewEdit);
