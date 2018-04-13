import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './containers/Root';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './store/configureStore';
import { createBrowserHistory } from 'history';
import { RootState } from './store/index'
import './styles/index.css';

const history = createBrowserHistory();
const store = configureStore(history, {} as RootState);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
