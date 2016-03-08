import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
  FETCH_EXCERPTS,
  FETCH_EXCERPTS_SUCCESSFUL,
  FETCH_EXCERPTS_ERROR,
  FETCH_BLOG,
  FETCH_BLOG_SUCCESSFUL,
  FETCH_BLOG_ERROR,
  SHOW_COMMENTS,
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
    error: false,
    showComments: false
  },
  login: {
    loggedIn: false,
    posting: false,
    error: false,
    success: false,
    username: '',
    password: ''
  }
};

export function excerpts(excerpts = initialState.excerpts, { type, payload, error }) {
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

export function blog(blog = initialState.blog, { type, payload, error }) {
  switch (type) {
    case FETCH_BLOG:
      return { ...blog, fetching: true, error, showComments: false };
    case FETCH_BLOG_SUCCESSFUL:
      return { ... blog, fetching: false, error, showComments: false, data: payload };
    case FETCH_BLOG_ERROR:
      return { ...blog, fetching: false, error, showComments: false, data: payload };
    case SHOW_COMMENTS:
      return { ...blog, showComments: true };
    default:
      return blog;
  }
}

function login(login = initialState.login, { type, payload = {}, error }) {
  const data = payload.target;
  console.log(data ? data.value : 'derp');

  return login;
}

export default combineReducers({
  routing: routerReducer,
  excerpts,
  blog,
  login
});
