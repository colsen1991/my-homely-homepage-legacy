import { AJAX } from '../actions';

function status200ish(status) {
  return status >= 200 && status < 300;
}

function checkStatus(response) {
  if (status200ish(response.status))
    return response;

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(defaultIfNoData) {
  return response => {
    if (response.status === 204)
      return defaultIfNoData;

    return response.json();
  };
}

function ajax(url, options, defaultIfNoData) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON(defaultIfNoData));
}

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
