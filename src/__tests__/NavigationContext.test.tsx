import React from 'react';
import TestRenderer from 'react-test-renderer';
import { View } from 'react-native';

import { NavigationConsumer, withNavigation, useNavigation } from '../NavigationContext';
import { Navigation } from '../Navigation.store';

describe('NavigationContext', () => {
  describe('NavigationConsumer', () => {
    it('connects to context and exposes the navigation prop', () => {
      const expectedNavigation = new Navigation();
      TestRenderer.create(
        <NavigationConsumer>
          {navigation => {
            expect(navigation).toEqual(expectedNavigation);
            return <View />;
          }}
        </NavigationConsumer>
      );
      expect.assertions(1);
    });
  });
  describe('withNavigation', () => {
    it('connects to context and exposes the navigation prop', () => {
      const expectedNavigation = new Navigation();
      // @ts-ignore
      const ViewWithNavigation = withNavigation(View);
      const testRenderer = TestRenderer.create(<ViewWithNavigation />);
      // @ts-ignore
      expect(testRenderer.root.children[0].props.navigation).toEqual(expectedNavigation);
      expect.assertions(1);
    });
  });
  describe('useNavigation', () => {
    it('connects to context and exposes the navigation prop', () => {
      const expectedNavigation = new Navigation();
      const ViewWithNavigation = () => {
        const navigation = useNavigation();
        // @ts-ignore
        return <View navigation={navigation} />;
      };
      const testRenderer = TestRenderer.create(<ViewWithNavigation />);
      // @ts-ignore
      expect(testRenderer.root.children[0].props.navigation).toEqual(expectedNavigation);
      expect.assertions(1);
    });
  });
});
