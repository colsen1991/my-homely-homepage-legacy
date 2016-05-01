import React from 'react';
import ReactSpinner from 'react-spin';

const config = {
  lines: 11,
  length: 0,
  width: 9,
  radius: 15,
  corners: 0,
  trail: 50
};

const Spinner = () => <ReactSpinner config={config}/>;

export default Spinner;
