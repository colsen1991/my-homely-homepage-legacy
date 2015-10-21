import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <header id='site-header' className='adjust-size'>
        <h1>My Homely Homepage</h1>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/blog'>Blog</Link>
          <Link to='/about'>About</Link>
        </nav>
      </header>
    );
  }
}
