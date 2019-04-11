import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationProvider } from 'react-gondola';

interface IProps {}
export default class App extends Component<IProps> {
  render() {
    return (
      <NavigationProvider>
        <View />
      </NavigationProvider>
    );
  }
}
