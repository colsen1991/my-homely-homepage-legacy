'use strict';

const React = require('react');
const $ = require('jquery');
const CommentBox = require('./commentBox/commentBox');

const MainWrapper = React.createClass({
  getInitialState: function () {
    return {data: []};
  },
  render: function () {
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
});

module.exports = MainWrapper;
