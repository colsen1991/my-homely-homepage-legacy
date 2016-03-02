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

export function getBlogExcerpts() {
  return get('/api/blog/excerpts');
}

export function setBlogExcerpts(newBlogExcerpts) {
  store.blogExcerpts = newBlogExcerpts;
}

export function getBlogPost(id) {
  return get(`/api/blog/${id}`);
}

export function setBlogPost(newBlogPost) {
  if (!store.blogPosts.find(blogPost => blogPost.id === newBlogPost.id)) {
    store.blogPosts = [];
    store.blogPosts = [...store.blogPosts, newBlogPost];
  }
}

export default store;
