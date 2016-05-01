import React from 'react';

export const PageNotFound = () => <p>The drones you are looking for could not be found o_O AKA 404 and all that...</p>;

export const InternalServerError = () => <p>Shit hit the fan...No not literally!That means status 500...</p>;

export const UnknownError = () => <p>An unkown server error occured...Our underfed feetless teddybears are working on fixing the issue.</p>;

export const NoConnection = () => <p>An unknown local error occured.Best bet is that your connection is down. Try refreshing when big brother is watching you once again.</p>;

export const RequestWentToShit = ({ response = {} }) => {
  if (!response.status)
    return <NoConnection/>;

  const status = response.status;

  if (status === 404)
    return <PageNotFound/>;

  if (status === 500)
    return <InternalServerError/>;

  return <UnknownError/>;
};
