'use strict';

import React from 'react';
import $ from 'jquery';
import CommentBox from './commentBox/commentBox';

class MainWrapper extends React.Component {
  render() {
    return (
      <div id="main-wrapper">
        <header id="site-header">
          <h1>My Homeley Homepage</h1>
        </header>
        <div id="content">
          <CommentBox url='/comments' pollInterval={2000}/>
        </div>
        <footer id="site-footer"></footer>
      </div>
    )
  }
}

export default MainWrapper;
