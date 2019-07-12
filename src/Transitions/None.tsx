import React, { Children } from 'react';
import { View, StyleSheet } from 'react-native';

import { ITransition, TransitionComponent } from './Transition.d';

export class None extends TransitionComponent implements ITransition {
  render() {
    if (!this.props.directionForward) {
      return null;
    }
    return (
      <View style={StyleSheet.absoluteFill}>
        {Children.only(this.props.children)}
      </View>
    );
  }
}
