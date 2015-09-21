import React from 'react';
import $ from 'jquery';
import {isEnter, isShift} from './../helpers/eventHelpers';
import {COMMENTS_URL, COMMENTS_POLL_INTERVAL} from './../consts/appConsts';

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  loadCommentsFromServer() {
    $.ajax({
      url: COMMENTS_URL,
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: (data, status) => {
        console.log('GET', COMMENTS_URL, status);
        this.setState({data});
      },
      error: (xhr, status, err) => {
        // TODO Error handling
        console.error(COMMENTS_URL, status, err.toString());
      }
    });
  }

  handleCommentSubmit(comment) {
    $.ajax({
      url: COMMENTS_URL,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data, status) => {
        console.log('POST', COMMENTS_URL, status);

        let oldData = this.state.data,
          newData = oldData.concat([comment]);
        this.setState({data: newData});
      },
      error: (xhr, status, err) => {
        // TODO Error handling
        console.error(COMMENTS_URL, status, err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer.bind(this), COMMENTS_POLL_INTERVAL);
  }

  render() {
    return (
      <div className='comment-box'>
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
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
      <div className='comment-list'>
        {commentNodes}
      </div>
    );
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className='comment'>
        <h2>{this.props.comment.author}</h2>
        <p>{this.props.comment.text}</p>
      </div>
    )
  }
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();

    let author = React.findDOMNode(this.refs.author).value.trim();
    let text = React.findDOMNode(this.refs.text).value.trim();

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
      <div className='comment-form-wrapper'>
        <h2>Write a comment</h2>
        <form className='comment-form' onSubmit={this.handleSubmit.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}>
          <input className='comment-name' type='text' placeholder='Your name' ref='author'/><br/>
          <textarea className='comment-text' placeholder='Say something...' ref='text'/><br/>
          <input type='submit' value='Post'/>
        </form>
      </div>
    );
  }
}
