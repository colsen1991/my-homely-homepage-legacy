import React from 'react';
import Spinner from 'react-spin';

const config = {
  lines: 11,
  length: 0,
  width: 9,
  radius: 15,
  corners: 0,
  trail: 50
};

export default () => <Spinner config={config}/>;
