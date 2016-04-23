import React from 'react';
import PageNotFound from './404.jsx';
import InternalServerError from './500.jsx';
import UnknowError from './unkown.jsx';

export default ({ status }) => {
  if (status === 404)
    return <PageNotFound/>;

  if (status === 500)
    return <InternalServerError/>;

  return <UnknowError/>;
};
