import * as React from 'react';
import UITable from '../components/UITable'
import '../styles/App.css';

export default class App extends React.Component<{},{}> {
  render() {
    return (
      <div className="App">
        <UITable />
      </div>
    );
  }
}