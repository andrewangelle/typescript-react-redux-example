import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { History } from 'history';
import { RootState, reducers } from './index';


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