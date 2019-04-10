import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Provider } from 'mobx-react/native';
import { View } from 'react-native';

import { NavigationProvider } from '../NavigationProvider';

describe('NavigationProvider', () => {
  it('renders a MobX provider with a navigation prop', () => {
    const testRenderer = TestRenderer.create(
      <NavigationProvider>
        <View />
      </NavigationProvider>
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
    const testInstance = testRenderer.root;
    const providerInstance = testInstance.findByType(Provider);
    expect(providerInstance.props.navigation).toBeDefined();
  });
});
