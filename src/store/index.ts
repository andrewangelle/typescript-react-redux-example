import { Reducer, combineReducers } from 'redux';
import { RouterState, routerReducer } from 'react-router-redux';
import { PostFilter } from './posts/types';
import postsReducer from './posts/reducers';

export interface PostState {
  loading: boolean;
  error: null | Error;
  data: object;
  filters: PostFilter
}

export interface RootState {
  router: RouterState;
  posts: PostState;
}

export const reducers: Reducer<RootState> = combineReducers<RootState>({
  router: routerReducer,
  posts: postsReducer
})