import React from 'react';
import marked from 'marked';
import {getBlog} from './../config/endpoints'
import BlogExcerpt from './blogListEntry'
import {GET} from './../helpers/httpHelpers';

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    GET(getBlog(this.props.params.blogId))
      .then(data => this.setState({data}))
      .catch(error => console.error(error))
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
