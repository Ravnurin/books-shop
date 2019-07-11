import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

import rootReducer from 'Reducers';

export const history = createBrowserHistory();

const initialState = {};

const composedEnhancers = compose(
  applyMiddleware(
    thunk,
    routerMiddleware(history)
  )
);

const store = createStore(rootReducer(history), initialState, composedEnhancers);

export default store;