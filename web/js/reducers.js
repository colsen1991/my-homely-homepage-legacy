import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
  FETCH_EXCERPTS,
  FETCH_EXCERPTS_SUCCESSFUL,
  FETCH_EXCERPTS_ERROR,
  FETCH_BLOG,
  FETCH_BLOG_SUCCESSFUL,
  FETCH_BLOG_ERROR,
  
} from './actions';

export const initialState = {
  routing: {},
  excerpts: {
    data: [],
    fetching: true,
    error: false
  },
  blog: {
    data: {},
    fetching: true,
    error: false
  }
};

function excerpts(excerpts = initialState.excerpts, { type, payload, error }) {
  switch (type) {
    case FETCH_EXCERPTS:
      return { ...excerpts, fetching: true, error };
    case FETCH_EXCERPTS_SUCCESSFUL:
      return { ... excerpts, fetching: false, error, data: payload };
    case FETCH_EXCERPTS_ERROR:
      return { ...excerpts, fetching: false, error, data: payload };
    default:
      return excerpts;
  }
}

function blog(blogs = initialState.blog, { type, payload, error }) {
  switch (type) {
    case FETCH_BLOG:
      return { ...blogs, fetching: true, error };
    case FETCH_BLOG_SUCCESSFUL:
      return { ... blogs, fetching: false, error, data: payload };
    case FETCH_BLOG_ERROR:
      return { ...blogs, fetching: false, error, data: payload };
    default:
      return blogs;
  }
}

export default combineReducers({
  routing: routerReducer,
  excerpts,
  blog
});
