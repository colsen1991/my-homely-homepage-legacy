import React, {Component} from 'react';
import {blogIdListUrl} from './../../config/endpoints';
import BlogListEntry from './blogListEntry';
import {get} from '../../utils/httpUtils';

export default class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    get(blogIdListUrl())
      .then(data => this.setState({data}))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div id="blog-list">
        {this.getBlogListEntries()}
      </div>
    );
  }

  getBlogListEntries() {
    return this.state.data.map((val) => {
      return (<BlogListEntry blogId={val._id} key={val._id}/>);
    });
  }
}
