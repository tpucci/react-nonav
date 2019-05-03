import React, { Component } from 'react';
import { SignIn } from './canals/SignIn';

interface IProps {}
export default class App extends Component<IProps> {
  render() {
    return <SignIn />;
  }
}
