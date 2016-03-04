import React from 'react';
import PageNotFound from './404';
import InternalServerError from './500';
import UnknowError from './unkown';

export default ({ status }) => {
  if (status === 404)
    return <PageNotFound/>;

  if (status === 500)
    return <InternalServerError/>;

  return <UnknowError/>;
}
