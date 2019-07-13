import React, { Component } from 'react';
import { createCanal } from 'react-gondola';
import { SlideLeft, SlideUp, RotateCrazy } from 'react-gondola/transitions';
import { FirstName } from './FirstName';
import { LastName } from './LastName';
import { Confirm } from './Confirm';

export class SignIn extends Component {
  state = {
    confirm: false,
    lastName: false
  };

  goForward = () => {
    if (!this.state.lastName) {
      return this.setState({ lastName: true });
    }
    return this.setState({ confirm: true });
  };

  goBackward = () => {
    if (this.state.confirm) {
      return this.setState({ confirm: false });
    }
    return this.setState({ lastName: false });
  };

  SignInCanal = createCanal([
    {
      Component: FirstName,
      name: 'firstName',
      props: { onNext: this.goForward }
    },
    {
      Component: LastName,
      Transitioner: RotateCrazy,
      name: 'lastName',
      onBack: this.goBackward,
      props: { onNext: this.goForward }
    },
    {
      Component: Confirm,
      Transitioner: RotateCrazy,
      name: 'confirm',
      onBack: this.goBackward
    }
  ]);

  render() {
    const { SignInCanal } = this;

    return (
      <SignInCanal
        firstName
        lastName={this.state.lastName}
        confirm={this.state.confirm}
      />
    );
  }
}
