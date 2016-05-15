import { browserHistory } from 'react-router';

const ssc = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let sscIndex = 0;

function init() {
  window.onkeydown = ({ which }) => {
    if (ssc[sscIndex] === which) {
      sscIndex++;

      if (sscIndex === ssc.length && confirm('goto admin?')) // eslint-disable-line
        browserHistory.push('/admin');
    } else
      sscIndex = 0;
  };
}

export default init;
