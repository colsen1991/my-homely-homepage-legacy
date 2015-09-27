import React from 'react';
import {getBlogExcerpt} from './../config/endpoints';
import {Link} from 'react-router';
import {GET} from './../helpers/httpHelpers';


export default class BlogExcerpt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    GET(getBlogExcerpt(this.props.blogId))
      .then(data => this.setState({data}))
      .catch(error => console.error(error))
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
