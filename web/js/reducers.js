import { combineReducers } from 'redux';
import { routerReducer, LOCATION_CHANGE } from 'react-router-redux';
import {
  SEARCH_EXCERPTS,
  FETCH_BLOG_START,
  FETCH_BLOG_SUCCESSFUL,
  FETCH_BLOG_ERROR,
  FETCH_BLOG_POST_START,
  FETCH_BLOG_POST_SUCCESSFUL,
  FETCH_BLOG_POST_ERROR,
  SHOW_COMMENTS,
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FETCH_ALL_BLOG_POSTS_START,
  FETCH_ALL_BLOG_POSTS_SUCCESSFUL,
  FETCH_ALL_BLOG_POSTS_ERROR,
  FETCH_BLOG_POST_FOR_EDITING_START,
  FETCH_BLOG_POST_FOR_EDITING_SUCCESSFUL,
  FETCH_BLOG_POST_FOR_EDITING_ERROR,
  TITLE_CHANGED,
  TAGS_CHANGED,
  HEADER_IMAGE_LINK_CHANGED,
  EXCERPT_CHANGED,
  TEXT_CHANGED,
  PUBLISHED_CHANGED,
  SAVE_BLOG_START,
  SAVE_BLOG_SUCCESSFUL,
  SAVE_BLOG_ERROR
} from './actions';

export const initialState = {
  routing: {},
  blog: {
    data: [],
    fetching: true,
    error: false,
    search: ''
  },
  blogPost: {
    data: {
      id: '',
      headerImageLink: '',
      title: '',
      tags: [],
      date: '',
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
    token: '',
  },
  allBlogPosts: {
    data: [],
    fetching: true,
    error: false
  },
  blogPostForEditing: {
    data: {
      id: '',
      headerImageLink: '',
      title: '',
      tags: [],
      date: '',
      excerpt: '',
      text: '',
      published: false
    },
    fetching: true,
    errorFetching: false,
    saving: false,
    successSaving: false,
    errorSaving: false
  }
};

export function blog(blog = initialState.blog, { type, payload, error }) {
  switch (type) {
    case FETCH_BLOG_START:
      return { ...blog, fetching: true, error: false };
    case FETCH_BLOG_SUCCESSFUL:
      return { ... blog, fetching: false, error: false, data: payload };
    case FETCH_BLOG_ERROR:
      return { ...blog, fetching: false, error, data: payload };
    case SEARCH_EXCERPTS:
      return { ...blog, search: payload };
    default:
      return blog;
  }
}

export function blogPost(blogPost = initialState.blogPost, { type, payload, error }) {
  switch (type) {
    case FETCH_BLOG_POST_START:
      return { ...blogPost, fetching: true, error: false, showComments: false };
    case FETCH_BLOG_POST_SUCCESSFUL:
      return { ... blogPost, fetching: false, error: false, showComments: false, data: payload };
    case FETCH_BLOG_POST_ERROR:
      return { ...blogPost, fetching: false, error, showComments: false, data: payload };
    case SHOW_COMMENTS:
      return { ...blogPost, showComments: true };
    default:
      return blogPost;
  }
}

function login(login = initialState.login, { type, payload, error }) {
  switch (type) {
    case USERNAME_CHANGED:
      return { ...login, username: payload };
    case PASSWORD_CHANGED:
      return { ...login, password: payload };
    case LOGIN_START:
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

export function allBlogPosts(allBlogPosts = initialState.allBlogPosts, { type, payload, error }) {
  switch (type) {
    case FETCH_ALL_BLOG_POSTS_START:
      return { ...allBlogPosts, fetching: true, error: false };
    case FETCH_ALL_BLOG_POSTS_SUCCESSFUL:
      return { ... allBlogPosts, fetching: false, error: false, data: payload };
    case FETCH_ALL_BLOG_POSTS_ERROR:
      return { ...allBlogPosts, fetching: false, error, data: payload };
    default:
      return allBlogPosts;
  }
}

export function blogPostForEditing(blogPost = initialState.blogPostForEditing, { type, payload, error }) {
  switch (type) {
    case FETCH_BLOG_POST_FOR_EDITING_START:
      return { ...blogPost, fetching: true, errorFetching: false };
    case FETCH_BLOG_POST_FOR_EDITING_SUCCESSFUL:
      return { ... blogPost, fetching: false, errorFetching: false, data: payload };
    case FETCH_BLOG_POST_FOR_EDITING_ERROR:
      return { ...blogPost, fetching: false, errorFetching: error, data: payload };
    case TITLE_CHANGED:
      return { ...blogPost, data: { ...blogPost.data, title: payload } };
    case TAGS_CHANGED:
      return { ...blogPost, data: { ...blogPost.data, tags: payload } };
    case HEADER_IMAGE_LINK_CHANGED:
      return { ...blogPost, data: { ...blogPost.data, headerImageLink: payload } };
    case EXCERPT_CHANGED:
      return { ...blogPost, data: { ...blogPost.data, excerpt: payload } };
    case TEXT_CHANGED:
      return { ...blogPost, data: { ...blogPost.data, text: payload } };
    case PUBLISHED_CHANGED:
      return { ...blogPost, data: { ...blogPost.data, published: !blogPost.data.published } };
    case SAVE_BLOG_START:
      return { ...blogPost, saving: true, errorSaving: false, successSaving: false };
    case SAVE_BLOG_SUCCESSFUL:
      return { ...blogPost, saving: false, errorSaving: false, successSaving: true };
    case SAVE_BLOG_ERROR:
      return { ...blogPost, saving: false, errorSaving: error, successSaving: false };
    case LOCATION_CHANGE:
      return initialState.blogPostForEditing;
    default:
      return blogPost;
  }
}

export default combineReducers({
  routing: routerReducer,
  blog,
  blogPost,
  login,
  allBlogPosts,
  blogPostForEditing
});
