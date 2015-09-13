import React from 'react';
import $ from 'jquery';
import Link from 'react-router/lib/Link'
import CommentBox from './commentBox';

export default class MainWrapper extends React.Component {
  render() {
    return (
      <div id="site-wrapper">
        <div id="site-header-wrapper">
          <header id="site-header" className="adjust-size">
            <h1>My Homeley Homepage</h1>
            <nav>
              <Link>Nav 1</Link>
              <Link>Nav 2</Link>
              <Link>Nav 3</Link>
            </nav>
          </header>
        </div>

        <div id="site-main-wrapper" className="adjust-size">
          <div id="site-content">
            <CommentBox url='/comments' pollInterval='2000'/>
          </div>
        </div>

        <div id="site-footer-wrapper">
          <footer id="site-footer" className="adjust-size">
            <p>This site is protected by some copyright bullshit but not really cus open-source...</p>
          </footer>
        </div>
      </div>
    )
  }
}
