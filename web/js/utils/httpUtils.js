function status200ish(status) {
  return status >= 200 && status < 300;
}

function checkStatus(response) {
  if (status200ish(response.status))
    return response;
  else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(defaultIf204) {
  return response => {
    if (response.status === 204)
      return defaultIf204;

    return response.json();
  }
}

function ajax(url, options, defaultIf204) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON(defaultIf204))
}

export function GET(url, options = {}, defaultIf204 = {}) {
  return ajax(url, options, defaultIf204);
}

export function POST(url, options, defaultIf204 = {}) {
  return ajax(url, { ...options, method: 'post' }, defaultIf204);
}
