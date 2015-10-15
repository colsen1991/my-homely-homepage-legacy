import React, {Component} from 'react';
import {blogExcerptUrl} from './../../config/endpoints';
import {Link} from 'react-router';
import {get} from '../../utils/httpUtils';


export default class BlogExcerpt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    get(blogExcerptUrl(this.props.blogId))
      .then(data => this.setState({data}))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className='blog-list-entry'>
        <h1>
          <Link to={`/blog/${this.props.blogId}`}>{this.state.data.title}</Link>
        </h1>
        <p>{this.state.data.excerpt}</p>
      </div>
    );
  }
}
