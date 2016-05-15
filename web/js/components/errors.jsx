import React from 'react';

export const PageNotFound = () => <p>The drones you are looking for could not be found o_O AKA <strong>404</strong> and all that...</p>;

export const Unauthorized = () => <p>You are not supposed to be here... <strong>401</strong> in your face!</p>;

export const InternalServerError = () => <p>Shit hit the fan...No not literally!That means status <strong>500</strong>...</p>;

export const UnknownError = () => <p>An unkown server error occured...Our underfed, feetless teddy bears are working on fixing the issue.</p>;

export const NoConnection = () => <p>An unknown local error occured. Best bet is that your connection is down. Try refreshing when big brother is watching you once again.</p>;

export const RequestWentToShit = ({ response = {} }) => {
  if (!response.status)
    return <NoConnection/>;

  const status = response.status;

  if (status === 404)
    return <PageNotFound/>;

  if (status === 401)
    return <Unauthorized/>;

  if (status === 500)
    return <InternalServerError/>;

  return <UnknownError/>;
};
