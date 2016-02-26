import React from 'react';
import { browserHistory } from 'react-router';
import Routes from './routes';

export default () => <Routes history={browserHistory}/>;
