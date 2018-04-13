import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { RootState } from '../store'
import App from '../containers/App';

interface Props {
  store: Store<RootState>
}

class Root extends React.Component<Props> {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root

