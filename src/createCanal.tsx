import React, { ComponentType, Component as ReactComponent } from 'react';
import { ViewStyle, View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';
import { Canal } from './Canal';
import { Navigation } from './Navigation.store';

interface ILocalTransitionerProps {
  style?: ViewStyle;
}

export const createCanal = (
  ...PagesList: ComponentType[]
): ComponentType<ILocalTransitionerProps> => {
  for (let index = 0; index < PagesList.length; index++) {
    const Page = PagesList[index];
    if (!(React.isValidElement(Page) || typeof Page === 'function')) {
      throw new Error(
        `\`createCanal\` expects its arguments to be React components. Received type for argument ${index +
          1}: ${typeof Page}`
      );
    }
  }

  @observer
  class LocalTransitioner extends ReactComponent<ILocalTransitionerProps> {
    canal = new Canal(PagesList);

    constructor(props: ILocalTransitionerProps) {
      super(props);
      const navigation = Navigation.getInstance();
      navigation.canalsSubject.next(this.canal);
    }

    render() {
      return (
        <View style={this.props.style}>
          {Navigation.getInstance().state[this.canal.id].map(({ Component, name }) => (
            <View style={StyleSheet.absoluteFill} key={name}>
              <Component />
            </View>
          ))}
        </View>
      );
    }
  }
  return LocalTransitioner;
};
