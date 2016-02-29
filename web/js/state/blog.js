import { observable } from 'mobx';
import { blogExcerpts } from '../endpoints/endpoints';
import { get } from '../utils/httpUtils';

export const state = observable({
  excerpts: [],
  blogs: []
});

export function getBlogs() {
  get(blogExcerpts())
    .then(data => state.excerpts = data)
    .catch(error => console.error(error));
}
