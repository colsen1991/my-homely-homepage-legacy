import { createAction } from 'redux-actions';
import { GET } from './utils/httpUtils';

export const FETCH_EXCERPTS = 'FETCH_EXCERPTS';
export const FETCH_EXCERPTS_SUCCESSFUL = 'FETCH_EXCERTPS_SUCCESSFUL';
export const FETCH_EXCERPTS_ERROR = 'FETCH_EXCERTPS_ERROR';

export const fetchExcerptsAction = createAction(FETCH_EXCERPTS);
export const fetchExcerptsSuccessAction = createAction(FETCH_EXCERPTS_SUCCESSFUL);
export const fetchExcerptsErrorAction = createAction(FETCH_EXCERPTS_ERROR);

function fetchData(dispatch, url, fetchAction, successAction, errorAction) {
  dispatch(fetchAction());

  return GET(url, {}, [])
    .then(payload => dispatch(successAction(payload)))
    .catch(error => dispatch(errorAction(error)));
}


export const fetchExcerptsActionCreator = () => {
  return dispatch => {
    return fetchData(dispatch, '/api/blog/excerpts', fetchExcerptsAction, fetchExcerptsSuccessAction, fetchExcerptsErrorAction);
  }
};
