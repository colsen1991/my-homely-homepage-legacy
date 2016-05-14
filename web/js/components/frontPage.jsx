import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTitle } from '../actions';

export class FrontPage extends Component {
  componentDidMount() {
    this.props.changeTitle('My Homely Homepage');
  }

  render() {
    return <p>Hello world!</p>;
  }
}

class FrontPageContainer extends Component {
  render() {
    return <FrontPage changeTitle={this.props.changeTitle}/>;
  }
}

export default connect(undefined, { changeTitle })(FrontPageContainer);
