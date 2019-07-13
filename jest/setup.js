import { configure } from 'mobx';

configure({
  enforceActions: 'observed',
});

Date.now = jest.fn(() => 0);

jest.mock('react-native-reanimated/src/ReanimatedEventEmitter');
jest.mock('react-native-reanimated/src/ReanimatedModule', () => ({
  configureNativeProps: () => {},
  connectNodes: () => {},
  disconnectNodes: () => {},
  createNode: () => {},
  configureProps: () => {},
  getValue: () => {},
  dropNode: () => {},
}));
jest.mock('react-native-reanimated/src/derived/evaluateOnce');
jest.mock('react-native-reanimated/src/core/AnimatedProps');
