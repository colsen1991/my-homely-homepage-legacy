import React from 'react';
import { Link } from 'react-router';

const ErrorOccured = ({ location: { query: { prev } } }) => (
  <section>
    <p>Uh oh! A severe error occured on the site, so I reloaded the page and routed you here...</p>
    <p>Rest assured the my team of highly trained potatoes will be looking in to this!</p>
    <p>
      In the meanwhile I would recommend { prev ? <Link onlyActiveOnIndex={true} to={prev}>trying again</Link> : 'trying again'}.
      Who knows, maybe it will magically work this time?
    </p>
  </section>
);

export default ErrorOccured;
