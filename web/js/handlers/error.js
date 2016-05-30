import ajax from '../util/ajax';

function init() {
  window.onerror = (message, source, lineno, colno, error) => {
    ajax('/api/error', {
      method: 'post',
      body: JSON.stringify({
        message,
        source,
        lineno,
        colno,
        stack: error.stack
      }),
      headers: { 'Content-Type': 'application/json' }
    }).catch(() => true);

    window.location = `/error?prev=${window.location.pathname}`;

    return true;
  };
}

export default init;
