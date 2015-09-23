import React from 'react';
import marked from 'marked';
import $ from 'jquery';
import {getBlog} from './../config/endpoints'
import BlogExcerpt from './blogListEntry'

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    $.ajax({
      url: getBlog(this.props.params.blogId),
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: (data) => {
        this.setState({data});
      }
    });
  }

  render() {
    return (
      <article className='blog-post'>
        <header>
          <h1>{this.state.data.title}</h1>
          <p>{this.state.data.excerpt}</p>
          <section dangerouslySetInnerHTML={{__html: marked(this.state.data.text || '')}}/>
        </header>
      </article>
    );
  }
}
