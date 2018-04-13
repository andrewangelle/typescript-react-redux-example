import { createStore, applyMiddleware, Reducer, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import { History } from 'history';
import { RootState } from './index';
import postsReducer from './posts/reducers';

const reducers: Reducer<RootState> = combineReducers<RootState>({
  router: routerReducer,
  posts: postsReducer
})

export function configureStore(history: History, initialState: RootState) {
  const router = routerMiddleware(history);
  return createStore(
    reducers,
    initialState,
    applyMiddleware(router, thunk)
  )
}