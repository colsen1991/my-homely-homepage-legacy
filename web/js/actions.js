import { createAction } from 'redux-actions';
import { browserHistory } from 'react-router';
import cookies from 'js-cookie';
import { makeBlogId } from './util/stringUtils';
import { extractValueFromEvent } from './util/actionsUtils';

export const AJAX = 'AJAX';

export const SEARCH = 'SEARCH';

export const CHANGE_TITLE = 'CHANGE_TITLE';

export const FETCH_BLOG_START = 'FETCH_BLOG_START';
export const FETCH_BLOG_SUCCESSFUL = 'FETCH_BLOG_SUCCESSFUL';
export const FETCH_BLOG_ERROR = 'FETCH_BLOG_ERROR';

export const FETCH_BLOG_POST_START = 'FETCH_BLOG_POST_START';
export const FETCH_BLOG_POST_SUCCESSFUL = 'FETCH_BLOG_POST_SUCCESSFUL';
export const FETCH_BLOG_POST_ERROR = 'FETCH_BLOG_POST_ERROR';
export const SHOW_COMMENTS = 'SHOW_COMMENTS';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const USERNAME_CHANGED = 'USERNAME_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';

export const FETCH_ALL_BLOG_POSTS_START = 'FETCH_ALL_BLOG_POSTS_START';
export const FETCH_ALL_BLOG_POSTS_SUCCESSFUL = 'FETCH_ALL_BLOG_POSTS_SUCCESSFUL';
export const FETCH_ALL_BLOG_POSTS_ERROR = 'FETCH_ALL_BLOG_POSTS_ERROR';

export const FETCH_BLOG_POST_FOR_EDITING_START = 'FETCH_BLOG_POST_FOR_EDITING_START';
export const FETCH_BLOG_POST_FOR_EDITING_SUCCESSFUL = 'FETCH_BLOG_POST_FOR_EDITING_SUCCESSFUL';
export const FETCH_BLOG_POST_FOR_EDITING_ERROR = 'FETCH_BLOG_POST_FOR_EDITING_ERROR';
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

  browserHistory.push(`/blog?search=${encodeURIComponent(payload)}`);

  return { type: SEARCH, payload };
};

export const changeTitle = payload => {
  document.title = payload;

  return { type: CHANGE_TITLE, payload };
};

export const fetchBlogStart = createAction(FETCH_BLOG_START);
export const fetchBlogSuccess = createAction(FETCH_BLOG_SUCCESSFUL);
export const fetchBlogError = createAction(FETCH_BLOG_ERROR);
export const fetchBlog = () => ({
  type: AJAX,
  payload: {
    url: '/api/blog',
    defaultIfNoData: [],
    actions: {
      start: fetchBlogStart,
      success: fetchBlogSuccess,
      error: fetchBlogError
    }
  }
});

export const fetchBlogPostStart = createAction(FETCH_BLOG_POST_START);
export const fetchBlogPostSuccess = createAction(FETCH_BLOG_POST_SUCCESSFUL);
export const fetchBlogPostError = createAction(FETCH_BLOG_POST_ERROR);
export const showComments = createAction(SHOW_COMMENTS);
export const fetchBlogPost = (id) => ({
  type: AJAX,
  payload: {
    url: `/api/blog/${id}`,
    actions: {
      start: fetchBlogPostStart,
      success: fetchBlogPostSuccess,
      error: fetchBlogPostError
    }
  }
});

export const loginStart = createAction(LOGIN_START);
export const loginActualSuccess = createAction(LOGIN_SUCCESS);
export const loginSuccess = payload => dispatch => {
  dispatch(loginActualSuccess(payload));

  browserHistory.push('/admin');

  cookies.set('token', payload.token, { expires: 1, secure: true });
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

export const fetchAllBlogPostsStart = createAction(FETCH_ALL_BLOG_POSTS_START);
export const fetchAllBlogPostsSuccess = createAction(FETCH_ALL_BLOG_POSTS_SUCCESSFUL);
export const fetchAllBlogPostsError = createAction(FETCH_ALL_BLOG_POSTS_ERROR);
export const fetchAllBlogPosts = () => ({
  type: AJAX,
  payload: {
    url: '/api/s/admin',
    auth: true,
    defaultIfNoData: [],
    actions: {
      start: fetchAllBlogPostsStart,
      success: fetchAllBlogPostsSuccess,
      error: fetchAllBlogPostsError
    }
  }
});

export const fetchBlogPostForEditingStart = createAction(FETCH_BLOG_POST_FOR_EDITING_START);
export const fetchBlogPostForEditingSuccess = createAction(FETCH_BLOG_POST_FOR_EDITING_SUCCESSFUL);
export const fetchBlogPostForEditingError = createAction(FETCH_BLOG_POST_FOR_EDITING_ERROR);
export const fetchBlogPostForEditing = (_id) => ({
  type: AJAX,
  payload: {
    url: `/api/s/blog/edit/${_id}`,
    auth: true,
    actions: {
      start: fetchBlogPostForEditingStart,
      success: fetchBlogPostForEditingSuccess,
      error: fetchBlogPostForEditingError
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
      url: _id ? `/api/s/blog/${_id}` : '/api/s/blog',
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
