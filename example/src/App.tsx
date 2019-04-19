import React, { Component } from 'react';
import { NavigationProvider } from 'react-gondola';
import { SignIn } from './canals/SignIn';

interface IProps {}
export default class App extends Component<IProps> {
  render() {
    return (
      <NavigationProvider>
        <SignIn />
      </NavigationProvider>
    );
  }
}
