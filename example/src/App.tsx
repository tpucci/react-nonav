import React, { Component } from 'react';
import { SignIn } from './canals/SignIn';
import { FullScreenPortal } from 'react-gondola';

export default class App extends Component<{}> {
  render() {
    return (
      <FullScreenPortal>
        <SignIn />
      </FullScreenPortal>
    );
  }
}
