import * as React from 'react';
import '../styles/loading-indicator.scss';

interface LoadingProps {
  message: string;
}

export default class LoadingIndicator extends React.Component
<LoadingProps, {}> {
  render() {
    const { message } = this.props;

    return (
      <div>
        <div className="loading-indicator"/>
        <div className="loading-message">
          {message}
        </div>
      </div>
    );
  }
}
