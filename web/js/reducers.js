import { combineReducers } from 'redux';
import {
  routerReducer,
  LOCATION_CHANGE
} from 'react-router-redux';
import {
  FETCH_EXCERPTS,
  FETCH_EXCERPTS_SUCCESSFUL,
  FETCH_EXCERPTS_ERROR,
  FETCH_BLOG,
  FETCH_BLOG_SUCCESSFUL,
  FETCH_BLOG_ERROR,
  SHOW_COMMENTS,
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FETCH_ALL_BLOGS,
  FETCH_ALL_BLOGS_SUCCESSFUL,
  FETCH_ALL_BLOGS_ERROR
} from './actions';

export const initialState = {
  routing: {},
  excerpts: {
    data: [],
    fetching: true,
    error: false
  },
  blog: {
    data: {
      id: '',
      headerImageLink: '',
      title: '',
      date: '',
      author: '',
      excerpt: '',
      text: ''
    },
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
    password: '',
    token: ''
  },
  allBlogs: {
    data: [],
    fetching: true,
    error: false
  }
};

export function excerpts(excerpts = initialState.excerpts, { type, payload, error }) {
  switch (type) {
    case FETCH_EXCERPTS:
      return { ...excerpts, fetching: true, error: false };
    case FETCH_EXCERPTS_SUCCESSFUL:
      return { ... excerpts, fetching: false, error: false, data: payload };
    case FETCH_EXCERPTS_ERROR:
      return { ...excerpts, fetching: false, error, data: payload };
    default:
      return excerpts;
  }
}

export function blog(blog = initialState.blog, { type, payload, error }) {
  switch (type) {
    case FETCH_BLOG:
      return { ...blog, fetching: true, error: false, showComments: false };
    case FETCH_BLOG_SUCCESSFUL:
      return { ... blog, fetching: false, error: false, showComments: false, data: payload };
    case FETCH_BLOG_ERROR:
      return { ...blog, fetching: false, error, showComments: false, data: payload };
    case SHOW_COMMENTS:
      return { ...blog, showComments: true };
    default:
      return blog;
  }
}

function login(login = initialState.login, { type, payload, error }) {
  switch (type) {
    case USERNAME_CHANGED:
      return { ...login, username: payload.target.value };
    case PASSWORD_CHANGED:
      return { ...login, password: payload.target.value };
    case LOGIN:
      return { ...login, posting: true, error: false, success: false };
    case LOGIN_SUCCESS:
      return { ...initialState.login, success: true, loggedIn: true, token: payload.token };
    case LOGIN_ERROR:
      return { ...login, posting: false, error, success: false, loggedIn: false };
    case LOCATION_CHANGE:
      return { ...initialState.login, loggedIn: login.loggedIn, token: login.token };
    default:
      return login;
  }
}

export function allBlogs(allBlogs = initialState.allBlogs, { type, payload, error }) {
  switch (type) {
    case FETCH_ALL_BLOGS:
      return { ...allBlogs, fetching: true, error: false };
    case FETCH_ALL_BLOGS_SUCCESSFUL:
      return { ... allBlogs, fetching: false, error: false, data: payload };
    case FETCH_ALL_BLOGS_ERROR:
      return { ...allBlogs, fetching: false, error, data: payload };
    default:
      return allBlogs;
  }
}

export default combineReducers({
  routing: routerReducer,
  excerpts,
  blog,
  login,
  allBlogs
});
