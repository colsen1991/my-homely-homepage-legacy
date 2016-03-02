import React from 'react';
import PageNotFound from './404';
import Status500 from './500';

export default ({ status }) => {
  if (status === 404)
    return  <PageNotFound/>;

  return <Status500/>
}
