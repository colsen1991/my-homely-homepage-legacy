import {createStore, applyMiddleware, compose} from 'redux';
import DevTools from './../components/devTools';
import thunk from 'redux-thunk';
import reducers from './../reducers/reducers';
import getRouter from './../routing/router';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  getRouter(),
  DevTools.instrument()
)(createStore);

export default function getStore() {
  const store = createStoreWithMiddleware(reducers);

  if (module.hot) {
    module.hot.accept('../reducers/reducers', () => {
      const nextReducer = require('../reducers/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
