import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { History } from 'history';
import { RootState, reducers } from './index';

export function configureStore(history: History, initialState: RootState) {
  const router = routerMiddleware(history);
  return createStore(
    reducers,
    initialState,
    applyMiddleware(router, thunk)
  )
}