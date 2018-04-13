import * as React from 'react';
import '../styles/animations.scss';

export default class Animate extends React.Component<object, {}> {
  render() {
    const { children } = this.props;
    return (
      <div className={`animate--appear`}>
        {children}
      </div>
    );
  }
}


