'use strict';

import React from 'react';
import $ from 'jquery';
import {isEnter, isShift} from './../helpers/eventHelpers';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  loadCommentsFromServer() {
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
  }

  handleCommentSubmit(comment) {
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
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
}

class CommentList extends React.Component {
  render() {
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
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <h2>{this.props.comment.author}</h2>
        <p>{this.props.comment.text}</p>
      </div>
    )
  }
}

class CommentForm extends React.Component {
  handleSubmit(e) {
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
  }

  handleKeyPress(e) {
    if (isEnter(e) && !isShift(e)) {
      this.handleSubmit(e);
    }
  }

  render() {
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
}

export default CommentBox;
