import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import reducers from '../reducers/reducers';

export default (history, initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(routerMiddleware(history), thunk, promise, createLogger()))
  );

  if (module.hot) {
    module.hot.accept('../reducers/reducers', () => {
      const nextRootReducer = require('../reducers/reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
