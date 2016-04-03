import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import ajaxMiddleware from '../middleware/ajaxMiddleware';
import reducers, { initialState } from '../reducers';

export default (history) => createStore(
  reducers,
  initialState,
  compose(applyMiddleware(routerMiddleware(history), thunk, ajaxMiddleware))
);
