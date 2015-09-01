'use strict';

const React = require('react');
const $ = require('jquery');
const eventHelpers = require('./../helpers/eventHelpers');

const CommentBox = React.createClass({
  getInitialState: function () {
    return {data: []};
  },
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: (data, status) => {
        console.log('GET', this.props.url, status);
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  handleCommentSubmit: function (comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data, status) => {
        console.log('POST', this.props.url, status);

        let oldData = this.state.data,
          newData = oldData.concat([comment]);
        this.setState({data: newData});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function () {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});

const CommentList = React.createClass({
  render: function () {
    let commentNodes = this.props.data.map((comment, index) => {
      return (
        <Comment comment={comment} key={index}/>
      );
    });

    return (
      <div className="comment-list">
        {commentNodes}
      </div>
    );
  }
});

const Comment = React.createClass({
  render: function () {
    return (
      <div className="comment">
        <h2>{this.props.comment.author}</h2>
        <p>{this.props.comment.text}</p>
      </div>
    )
  }
});

const CommentForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();

    let author = React.findDOMNode(this.refs.author).value.trim(),
      text = React.findDOMNode(this.refs.text).value.trim();

    if (!author || !text) {
      console.warn(author, text);
      return;
    }

    this.props.onCommentSubmit({
      author: author,
      text: text
    });

    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  handleKeyPress: function (e) {
    if (eventHelpers.isEnter(e) && !eventHelpers.isShift(e)) {
      this.handleSubmit(e);
    }
  },
  render: function () {
    return (
      <div className="comment-form-wrapper">
        <h2>Write a comment</h2>
        <form className="comment-form" onSubmit={this.handleSubmit} onKeyPress={this.handleKeyPress}>
          <input className="comment-name" type="text" placeholder="Your name" ref="author"/><br/>
          <textarea className="comment-text" placeholder="Say something..." ref="text"/><br/>
          <input type="submit" value="Post"/>
        </form>
      </div>
    );
  }
});

module.exports = CommentBox;

