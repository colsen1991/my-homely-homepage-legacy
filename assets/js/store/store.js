import {createStore, applyMiddleware, compose} from 'redux';
import {reduxReactRouter} from 'redux-router';
import {createHashHistory} from 'history';
import DevTools from './../components/devTools';
import thunk from 'redux-thunk';
import routes from './../routes';
import reducers from './../reducers/reducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  reduxReactRouter({routes, createHistory: createHashHistory}),
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
