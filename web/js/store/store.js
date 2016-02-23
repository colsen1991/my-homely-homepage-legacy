import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import DevTools from './../components/devTools';
import reducers from './../reducers/reducers';

export default (history) => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(routerMiddleware(history), thunk, promise),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers/reducers', () => {
      const nextReducer = require('../reducers/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
