import React, { Component as ReactComponent, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { Observer } from 'mobx-react/native';
import { fromStream } from 'mobx-utils';
import { Navigation } from './Navigation';

export class FullScreenPortal extends ReactComponent {
  fullScreenStack = fromStream(
    Navigation.instance.fullScreenDelegate.fullSceenStack$
  );

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Fragment>{this.props.children}</Fragment>
        <Observer>
          {() => {
            if (this.fullScreenStack.current) {
              return (
                this.fullScreenStack.current &&
                this.fullScreenStack.current.map(
                  ({ Component, name, isAuthorized }) => (
                    <Component isAuthorized={isAuthorized} key={name} />
                  )
                )
              );
            }
            return null;
          }}
        </Observer>
      </View>
    );
  }
}
