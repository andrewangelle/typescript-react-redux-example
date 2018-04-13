import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './containers/Root';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import { configureStore } from './store/configureStore.dev';
import { createBrowserHistory } from 'history';
import { RootState } from './store/index'

const history = createBrowserHistory();
const store = configureStore(history, {} as RootState);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
