import React, { ComponentType } from 'react';
import { Text } from 'react-native';

export const stopCreator = <T extends string>(
  name: T,
  isFullScreen: boolean = false
): { name: T; Component: ComponentType; isFullScreen: boolean } => {
  const Component = () => <Text>{name}</Text>;
  return { name, Component, isFullScreen };
};
