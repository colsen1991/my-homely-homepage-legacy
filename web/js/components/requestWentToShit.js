import React from 'react';
import PageNotFound from './errors/404';
import InternalServerError from './errors/500';
import UnknowError from './errors/unkown';

export default ({ status }) => {
  if (status === 404)
    return <PageNotFound/>;

  if (status === 500)
    return <InternalServerError/>;

  return <UnknowError/>;
}
