import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Content extends Component {
  render() {
    return (
      <section id='site-content'>
        {this.props.children}
      </section>
    );
  }
}
