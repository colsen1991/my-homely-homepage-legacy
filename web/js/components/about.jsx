import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTitle } from '../actions';

export class About extends Component {
  componentDidMount() {
    const { changeTitle } = this.props;
    
    if (changeTitle)
      changeTitle('About');
  }

  render() {
    return <p>This page is about to filled with pun facts about me...</p>;
  }
}

class AboutContainer extends Component {
  render() {
    return <About changeTitle={this.props.changeTitle}/>;
  }
}

export default connect(undefined, { changeTitle })(AboutContainer);
