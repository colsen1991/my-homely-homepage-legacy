import { createAction } from 'redux-actions';
import { browserHistory } from 'react-router';
import { makeBlogId } from './util/stringUtils';
import { extractValueFromEvent } from './util/actionsUtils';

export const AJAX = 'AJAX';

export const SEARCH = 'SEARCH';

export const CHANGE_TITLE = 'CHANGE_TITLE';

export const FETCH_EXCERPTS_START = 'FETCH_EXCERPTS_START';
export const FETCH_EXCERPTS_SUCCESSFUL = 'FETCH_EXCERPTS_SUCCESSFUL';
export const FETCH_EXCERPTS_ERROR = 'FETCH_EXCERPTS_ERROR';

export const FETCH_BLOG_START = 'FETCH_BLOG_START';
export const FETCH_BLOG_SUCCESSFUL = 'FETCH_BLOG_SUCCESSFUL';
export const FETCH_BLOG_ERROR = 'FETCH_BLOG_ERROR';
export const SHOW_COMMENTS = 'SHOW_COMMENTS';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const USERNAME_CHANGED = 'USERNAME_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';

export const FETCH_ALL_BLOGS_START = 'FETCH_ALL_BLOGS_START';
export const FETCH_ALL_BLOGS_SUCCESSFUL = 'FETCH_ALL_BLOGS_SUCCESSFUL';
export const FETCH_ALL_BLOGS_ERROR = 'FETCH_ALL_BLOGS_ERROR';

export const FETCH_BLOG_FOR_EDITING_START = 'FETCH_BLOG_FOR_EDITING_START';
export const FETCH_BLOG_FOR_EDITING_SUCCESSFUL = 'FETCH_BLOG_FOR_EDITING_SUCCESSFUL';
export const FETCH_BLOG_FOR_EDITING_ERROR = 'FETCH_BLOG_FOR_EDITING_ERROR';
export const TITLE_CHANGED = 'TITLE_CHANGED';
export const TAGS_CHANGED = 'TAGS_CHANGED';
export const HEADER_IMAGE_LINK_CHANGED = 'HEADER_IMAGE_LINK_CHANGED';
export const EXCERPT_CHANGED = 'EXCERPT_CHANGED';
export const TEXT_CHANGED = 'TEXT_CHANGED';
export const PUBLISHED_CHANGED = 'PUBLISHED_CHANGED';
export const SAVE_BLOG_START = 'SAVE_BLOG_START';
export const SAVE_BLOG_SUCCESSFUL = 'SAVE_BLOG_SUCCESSFUL';
export const SAVE_BLOG_ERROR = 'SAVE_BLOG_ERROR';

export const search = event => {
  const payload = extractValueFromEvent(event);

  browserHistory.push(`/blog?search=${payload}`);

  return { type: SEARCH, payload };
};

export const changeTitle = payload => {
  document.title = payload;

  return { type: SEARCH, payload };
};

export const fetchExcerptsStart = createAction(FETCH_EXCERPTS_START);
export const fetchExcerptsSuccess = createAction(FETCH_EXCERPTS_SUCCESSFUL);
export const fetchExcerptsError = createAction(FETCH_EXCERPTS_ERROR);
export const fetchExcerpts = () => ({
  type: AJAX,
  payload: {
    url: '/api/blog/excerpts',
    defaultIfNoData: [],
    actions: {
      start: fetchExcerptsStart,
      success: fetchExcerptsSuccess,
      error: fetchExcerptsError
    }
  }
});

export const fetchBlogStart = createAction(FETCH_BLOG_START);
export const fetchBlogSuccess = createAction(FETCH_BLOG_SUCCESSFUL);
export const fetchBlogError = createAction(FETCH_BLOG_ERROR);
export const showComments = createAction(SHOW_COMMENTS);
export const fetchBlog = (id) => ({
  type: AJAX,
  payload: {
    url: `/api/blog/${id}`,
    actions: {
      start: fetchBlogStart,
      success: fetchBlogSuccess,
      error: fetchBlogError
    }
  }
});

export const loginStart = createAction(LOGIN_START);
export const loginActualSuccess = createAction(LOGIN_SUCCESS);
export const loginSuccess = payload => dispatch => {
  dispatch(loginActualSuccess(payload));

  browserHistory.push('/admin');
};
export const loginError = createAction(LOGIN_ERROR);
export const usernameChanged = createAction(USERNAME_CHANGED, extractValueFromEvent);
export const passwordChanged = createAction(PASSWORD_CHANGED, extractValueFromEvent);
export const login = (username, password) => ({
  type: AJAX,
  payload: {
    url: '/api/login',
    options: {
      method: 'post',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    },
    actions: {
      start: loginStart,
      success: loginSuccess,
      error: loginError
    }
  }
});

export const fetchAllBlogsStart = createAction(FETCH_ALL_BLOGS_START);
export const fetchAllBlogsSuccess = createAction(FETCH_ALL_BLOGS_SUCCESSFUL);
export const fetchAllBlogsError = createAction(FETCH_ALL_BLOGS_ERROR);
export const fetchAllBlogs = () => ({
  type: AJAX,
  payload: {
    url: '/api/secure/allBlogs',
    auth: true,
    defaultIfNoData: [],
    actions: {
      start: fetchAllBlogsStart,
      success: fetchAllBlogsSuccess,
      error: fetchAllBlogsError
    }
  }
});

export const fetchBlogForEditingStart = createAction(FETCH_BLOG_FOR_EDITING_START);
export const fetchBlogForEditingSuccess = createAction(FETCH_BLOG_FOR_EDITING_SUCCESSFUL);
export const fetchBlogForEditingError = createAction(FETCH_BLOG_FOR_EDITING_ERROR);
export const fetchBlogForEditing = (_id) => ({
  type: AJAX,
  payload: {
    url: `/api/secure/blog/${_id}`,
    auth: true,
    actions: {
      start: fetchBlogForEditingStart,
      success: fetchBlogForEditingSuccess,
      error: fetchBlogForEditingError
    }
  }
});
export const titleChanged = createAction(TITLE_CHANGED, extractValueFromEvent, extractValueFromEvent);
export const tagsChanged = createAction(TAGS_CHANGED, event => extractValueFromEvent(event).split(' '));
export const headerImageLinkChanged = createAction(HEADER_IMAGE_LINK_CHANGED, extractValueFromEvent);
export const excerptChanged = createAction(EXCERPT_CHANGED, extractValueFromEvent);
export const textChanged = createAction(TEXT_CHANGED, extractValueFromEvent);
export const publishedChanged = createAction(PUBLISHED_CHANGED);
export const saveBlogStart = createAction(SAVE_BLOG_START);
export const saveBlogSuccess = createAction(SAVE_BLOG_SUCCESSFUL);
export const saveBlogError = createAction(SAVE_BLOG_ERROR);
export const saveBlog = (data, _id = null) => {
  const blog = {
    ...data,
    id: makeBlogId(data.title),
    date: _id ? data.date : new Date().toString()
  };

  return {
    type: AJAX,
    payload: {
      url: _id ? `/api/secure/blog/${_id}` : '/api/secure/blog',
      auth: true,
      options: {
        method: _id ? 'put' : 'post',
        body: JSON.stringify({ blog }),
        headers: { 'Content-Type': 'application/json' }
      },
      actions: {
        start: saveBlogStart,
        success: saveBlogSuccess,
        error: saveBlogError
      }
    }
  };
};
