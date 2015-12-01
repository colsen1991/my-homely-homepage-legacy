import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';

const reducers = combineReducers({
  routing: routeReducer
});

export default reducers;
