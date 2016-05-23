function status200ish(status) {
  return status >= 200 && status < 300;
}

function checkStatus(response) {
  if (response && status200ish(response.status))
    return response;

  const error = new Error('Server responded with error.');
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

export default function ajax(url, options, defaultIfNoData = {}) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON(defaultIfNoData));
}