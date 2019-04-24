import React from 'react';
import TestRenderer from 'react-test-renderer';
import { View } from 'react-native';

import { NavigationContext } from '../NavigationContext';
import { Navigation } from '../Navigation.store';

describe('NavigationContext', () => {
  it('initializes a context with a new navigation store', () => {
    const expectedNavigation = new Navigation();
    TestRenderer.create(
      <NavigationContext.Consumer>
        {navigation => {
          expect(navigation).toEqual(expectedNavigation);
          return <View />;
        }}
      </NavigationContext.Consumer>
    );
    expect.assertions(1);
  });
});
