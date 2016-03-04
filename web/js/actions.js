import { createAction } from 'redux-actions';
import { GET } from './utils/httpUtils';

export const FETCH_EXCERPTS = 'FETCH_EXCERPTS';
export const FETCH_EXCERPTS_SUCCESSFUL = 'FETCH_EXCERTPS_SUCCESSFUL';
export const FETCH_EXCERPTS_ERROR = 'FETCH_EXCERTPS_ERROR';

export const FETCH_BLOG = 'FETCH_BLOG';
export const FETCH_BLOG_SUCCESSFUL = 'FETCH_BLOG_SUCCESSFUL';
export const FETCH_BLOG_ERROR = 'FETCH_BLOG_ERROR';

export const fetchExcerptsAction = createAction(FETCH_EXCERPTS);
export const fetchExcerptsSuccessAction = createAction(FETCH_EXCERPTS_SUCCESSFUL);
export const fetchExcerptsErrorAction = createAction(FETCH_EXCERPTS_ERROR);

export const fetchBlogAction = createAction(FETCH_BLOG);
export const fetchBlogSuccessAction = createAction(FETCH_BLOG_SUCCESSFUL);
export const fetchBlogErrorAction = createAction(FETCH_BLOG_ERROR);

function fetchData(dispatch, url, fetchAction, successAction, errorAction, defaultIf204 = {}) {
  dispatch(fetchAction());

  return GET(url, {}, defaultIf204)
    .then(payload => dispatch(successAction(payload)))
    .catch(error => dispatch(errorAction(error)));
}

export const fetchExcerptsActionCreator = () => {
  return dispatch => {
    return fetchData(dispatch, '/api/blog/excerpts', fetchExcerptsAction, fetchExcerptsSuccessAction, fetchExcerptsErrorAction, []);
  }
};

export const fetchBlogActionCreator = (id) => {
  return dispatch => {
    return fetchData(dispatch, `/api/blog/${id}`, fetchBlogAction, fetchBlogSuccessAction, fetchBlogErrorAction);
  }
};
