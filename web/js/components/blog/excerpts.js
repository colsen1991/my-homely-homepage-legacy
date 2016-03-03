import React, { createClass } from 'react';

export default ({ excerpts }) => (
  <div>
    Excerpts here!
  </div>
);

/*{excerpts.map(excerpt => <Excerpt {...excerpt} key={excerpt.id}/>)}*/

/*
 export default observer(createClass({
 componentDidMount() {
 this.ajaxCallFinished = false;

 getBlogExcerpts()
 .then(blogExcepts => {
 this.ajaxCallFinished = true;
 this.ajaxCallStatus = 200;
 setBlogExcerpts(blogExcepts);
 })
 .catch(error => {
 this.ajaxCallFinished = true;
 this.ajaxCallStatus = error.response.status;
 setBlogExcerpts([]);
 });
 },

 render() {
 const blogExcerpts = store.blogExcerpts;

 if (this.ajaxCallFinished) {
 if (this.ajaxCallStatus === 200)
 return <Excerpts excerpts={blogExcerpts}/>;

 return <RequestWentToShit status={this.ajaxCallStatus}/>
 }

 return <Spinner/>;
 }
 }));
 */
