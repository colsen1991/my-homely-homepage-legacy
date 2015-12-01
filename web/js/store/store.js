import {createStore as reduxCreateStore, applyMiddleware, compose} from 'redux';
import DevTools from './../components/devTools';
import thunk from 'redux-thunk';
import reducers from './../reducers/reducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  DevTools.instrument()
)(reduxCreateStore);

function createStore() {
  const store = createStoreWithMiddleware(reducers);

  if (module.hot) {
    module.hot.accept('../reducers/reducers', () => {
      const nextReducer = require('../reducers/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default createStore;
