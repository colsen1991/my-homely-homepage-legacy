import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <footer id='site-footer' className='adjust-size'>
        <span>This site is protected by some copyright bullshit but not really cus open-source...</span>
        <span>Admin? <Link to='/login'>Login</Link></span>
      </footer>
    );
  }
}
