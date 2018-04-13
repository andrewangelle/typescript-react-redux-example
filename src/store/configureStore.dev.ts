import { createStore, applyMiddleware, Reducer, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { History } from 'history';
import { RootState } from './index';
import postsReducer from './posts/reducers';

const reducers: Reducer<RootState> = combineReducers<RootState>({
  router: routerReducer,
  posts: postsReducer
})

export function configureStore(history: History, initialState: RootState){
  const composeEnhancers = composeWithDevTools({});
  const router = routerMiddleware(history);
  const logger = createLogger({collapsed: true});

  return createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(router, logger, thunk)
    )
  )
}