import { createAction } from 'redux-actions';
import {
  GET,
  POST
} from './utils/httpUtils';

export const FETCH_EXCERPTS = 'FETCH_EXCERPTS';
export const FETCH_EXCERPTS_SUCCESSFUL = 'FETCH_EXCERPTS_SUCCESSFUL';
export const FETCH_EXCERPTS_ERROR = 'FETCH_EXCERPTS_ERROR';

export const FETCH_BLOG = 'FETCH_BLOG';
export const FETCH_BLOG_SUCCESSFUL = 'FETCH_BLOG_SUCCESSFUL';
export const FETCH_BLOG_ERROR = 'FETCH_BLOG_ERROR';
export const SHOW_COMMENTS = 'SHOW_COMMENTS';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const USERNAME_CHANGED = 'USERNAME_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';

export const FETCH_ALL_BLOGS = 'FETCH_ALL_BLOGS';
export const FETCH_ALL_BLOGS_SUCCESSFUL = 'FETCH_ALL_BLOGS_SUCCESSFUL';
export const FETCH_ALL_BLOGS_ERROR = 'FETCH_ALL_BLOGS_ERROR';

export const fetchExcerpts = createAction(FETCH_EXCERPTS);
export const fetchExcerptsSuccess = createAction(FETCH_EXCERPTS_SUCCESSFUL);
export const fetchExcerptsError = createAction(FETCH_EXCERPTS_ERROR);

export const fetchBlog = createAction(FETCH_BLOG);
export const fetchBlogSuccess = createAction(FETCH_BLOG_SUCCESSFUL);
export const fetchBlogError = createAction(FETCH_BLOG_ERROR);
export const showComments = createAction(SHOW_COMMENTS);

export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginError = createAction(LOGIN_ERROR);
export const usernameChanged = createAction(USERNAME_CHANGED);
export const passwordChanged = createAction(PASSWORD_CHANGED);

export const fetchAllBlogs = createAction(FETCH_ALL_BLOGS);
export const fetchAllBlogsSuccess = createAction(FETCH_ALL_BLOGS_SUCCESSFUL);
export const fetchAllBlogsError = createAction(FETCH_ALL_BLOGS_ERROR);

function fetchData(dispatch, url, startAction, successAction, errorAction, options = {}, defaultIfNoData = {}) {
  dispatch(startAction());

  return GET(url, options, defaultIfNoData)
    .then(json => dispatch(successAction(json)))
    .catch(error => dispatch(errorAction(error)));
}

function postData(dispatch, url, data, startAction, successAction, errorAction, options = {}, defaultIfNoData = {}) {
  dispatch(startAction());

  return POST(url, options, data, defaultIfNoData)
    .then(json => dispatch(successAction(json)))
    .catch(error => dispatch(errorAction(error)));
}

export const fetchExcerptsActionCreator = () => {
  return dispatch => {
    return fetchData(dispatch, '/api/blog/excerpts', fetchExcerpts, fetchExcerptsSuccess, fetchExcerptsError, {}, []);
  }
};

export const fetchBlogActionCreator = (id) => {
  return dispatch => {
    return fetchData(dispatch, `/api/blog/${id}`, fetchBlog, fetchBlogSuccess, fetchBlogError);
  }
};

export const loginActionCreator = (username, password) => {
  return dispatch => {
    return postData(dispatch, '/api/login', { username, password }, login, loginSuccess, loginError);
  }
};

export const fetchAllBlogsActionCreator = () => {
  return (dispatch, getState) => {
    const options = {
      headers: {
        Authorization: getState().login.token
      }
    };

    return fetchData(dispatch, '/api/secure/allBlogs', fetchAllBlogs, fetchAllBlogsSuccess, fetchAllBlogsError, options, []);
  }
};
