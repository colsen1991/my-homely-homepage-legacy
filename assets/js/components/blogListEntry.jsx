import React from 'react';
import $ from 'jquery';
import {getBlogExcerpt} from './../config/endpoints';
import {Link} from 'react-router';

export default class BlogExcerpt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    $.ajax({
      url: getBlogExcerpt(this.props.blogId),
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: (data) => {
        this.setState({data});
      }
    });
  }

  render() {
    const href = `/blog/${this.props.blogId}`;

    return (
      <div className='blog-list-entry'>
        <h1>
          <Link to={href}>{this.state.data.title}</Link>
        </h1>
        <p>{this.state.data.excerpt}</p>
      </div>
    );
  }
}
