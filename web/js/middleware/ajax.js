import { AJAX } from '../actions';
import ajax from '../util/ajax';

export default function ajaxMiddleware({ dispatch, getState }) {
  return next => action => {
    const { type, payload } = action;

    if (type !== AJAX) return next(action);

    const { url, options = {}, auth, defaultIfNoData = {}, actions: { start, success, error } } = payload;

    if (auth)
      options.headers = { ...options.headers, Authorization: getState().login.token };

    dispatch(start());
    ajax(url, options, defaultIfNoData)
      .then(json => dispatch(success(json)))
      .catch(err => dispatch(error(err)));
  };
}
