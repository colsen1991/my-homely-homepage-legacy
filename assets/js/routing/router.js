import {reduxReactRouter} from 'redux-router';
import {createHashHistory} from 'history';
import routes from './routes';

export default function getRouter() {
  return reduxReactRouter({routes, createHistory: createHashHistory});
}
