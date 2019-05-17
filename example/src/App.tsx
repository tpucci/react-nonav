import React, { Component } from 'react';
import { SignIn } from './canals/SignIn';
import { FullScreenPortal } from 'react-gondola';

interface IProps {}
export default class App extends Component<IProps> {
  render() {
    return (
      <FullScreenPortal>
        <SignIn />
      </FullScreenPortal>
    );
  }
}
