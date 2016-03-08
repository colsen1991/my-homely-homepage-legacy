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

function parseJSON( defaultIfNoData) {
  return response => {
    if (response.status === 204)
      return defaultIfNoData;

    return response.json();
  }
}

function ajax(url, options, defaultIfNoData) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON(defaultIfNoData))
}

export function GET(url, options = {}, defaultIfNoData) {
  return ajax(url, options, defaultIfNoData);
}

export function POST(url, options = {}, data, defaultIfNoData) {
  return ajax(url, { ...options, method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }, defaultIfNoData);
}
