import { observable } from 'mobx';
import { get } from '../utils/httpUtils';

const store = observable({
  activeUrl: '/',
  blogExcerpts: [],
  blogPosts: []
});

export function setActiveUrl(url) {
  store.activeUrl = url;
}

export function getExcerpts() {
  get('/api/blog/excerpts')
    .then(extExcerpts => store.blogExcerpts = extExcerpts)
    .catch(error => console.error(error));
}

export function getBlogPost(id) {
  get(`/api/blog/${id}`)
    .then(extBlogPost => {
      if (!store.blogPosts.find(blogPost => blogPost.id === extBlogPost.id))
        store.blogPosts.push(extBlogPost)
    })
    .catch(error => console.error(error));
}

export default store;
