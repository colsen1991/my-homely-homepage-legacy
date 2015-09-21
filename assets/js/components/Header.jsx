import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <header id='site-header' className='adjust-size'>
        <h1>My Homeley Homepage</h1>
        <nav>
          <Link>Home</Link>
          <Link>Blog</Link>
          <Link>About</Link>
        </nav>
      </header>
    );
  }
}
