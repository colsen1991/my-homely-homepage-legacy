import React from 'react';
import {getBlogIdList} from './../config/endpoints';
import BlogListEntry from './blogListEntry';
import {GET} from './../helpers/httpHelpers';

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    GET(getBlogIdList())
      .then(data => this.setState({data}))
      .catch(error => console.error(error))
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
