import React, { ComponentType, Component as ReactComponent } from 'react';
import { ViewStyle, View, StyleSheet, StyleProp } from 'react-native';
import { observer } from 'mobx-react/native';
import { Canal, IStop } from './Canal';
import { Navigation } from './Navigation.store';

type CanalComponentProps<T> = {
  style?: StyleProp<ViewStyle>;
} & T;

export const createCanal = <
  T extends string,
  U extends { name: T } & IStop,
  V = { [K in U['name']]?: boolean }
>(
  ...StopsList: U[]
): ComponentType<CanalComponentProps<V>> => {
  for (let index = 0; index < StopsList.length; index++) {
    const Stop = StopsList[index];
    if (!Stop.name || typeof Stop.name !== 'string') {
      throw new Error(
        `\`createCanal\` could not find a valid \`name\` key for argument ${index +
          1}. Received: ${JSON.stringify(Stop)}`
      );
    }
    if (!(React.isValidElement(Stop.Component) || typeof Stop.Component === 'function')) {
      throw new Error(
        `\`createCanal\` could not find a valid \`Component\` key for argument ${index +
          1}. Received: ${JSON.stringify(Stop)}`
      );
    }
  }

  @observer
  class CanalComponent extends ReactComponent<CanalComponentProps<V>> {
    static defaultProps = {
      style: StyleSheet.absoluteFill,
    };

    canal = new Canal(StopsList);

    constructor(props: CanalComponentProps<V>) {
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

  // @ts-ignore
  return CanalComponent;
};
