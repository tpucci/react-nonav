import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationProvider } from 'react-gondola';

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <NavigationProvider>
        <View />
      </NavigationProvider>
    );
  }
}
