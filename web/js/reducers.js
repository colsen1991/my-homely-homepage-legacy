import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { FETCH_EXCERPTS, FETCH_EXCERPTS_SUCCESSFUL, FETCH_EXCERPTS_ERROR } from './actions';

export const initialState = {
  routing: {},
  excerpts: {
    data: [],
    fetching: false,
    error: false
  }
};

function excerpts(excerpts = initialState.excerpts, { type, payload, error }) {
  switch (type) {
    case FETCH_EXCERPTS:
      return { ...excerpts, fetching: true, error };
    case FETCH_EXCERPTS_SUCCESSFUL:
      return { ... excerpts, fetching: false, error, data: payload };
    case FETCH_EXCERPTS_ERROR:
      return { ...excerpts, fetching: false, error, data: payload };
    default:
      return excerpts;
  }
}

export default combineReducers({
  routing: routerReducer,
  excerpts
});
