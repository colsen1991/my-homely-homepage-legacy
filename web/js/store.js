import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import ajaxMiddleware from './middleware/ajaxMiddleware';
import reducers, { initialState } from './reducers';

export default (history) => {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(routerMiddleware(history), thunk, ajaxMiddleware, createLogger()))
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
