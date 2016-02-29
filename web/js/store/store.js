import { observable } from 'mobx';
import { blogExcerpts } from '../endpoints/endpoints';
import { get } from '../utils/httpUtils';

export const location = observable({
  activeUrl: '/'
});

export function setActiveUrl(url) {
  location.activeUrl = url;
}

export const blog = observable({
  excerpts: [],
  blogs: []
});

export function getExcerpts() {
  get(blogExcerpts())
    .then(data => blog.excerpts = data)
    .catch(error => console.error(error));
}
