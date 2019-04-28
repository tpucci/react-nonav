import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SignIn } from './canals/SignIn';

interface IProps {}
export default class App extends Component<IProps> {
  render() {
    return <SignIn style={StyleSheet.absoluteFill} />;
  }
}
