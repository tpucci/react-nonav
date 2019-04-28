import React from 'react';
import { View } from 'react-native';
import TestRenderer from 'react-test-renderer';

import { createCanal } from '../createCanal';
import { Navigation } from '../Navigation.store';
import { Canal } from '../Canal';

describe('createCanal', () => {
  it('throws an error if first arg is not a Component', () => {
    try {
      // @ts-ignore
      createCanal('aaa');
    } catch (error) {
      expect(error.message).toBe(
        '`createCanal` expects its arguments to be React components. Received type for argument 1: string'
      );
    }
    expect.assertions(1);
  });

  it('renders the first page when mounted', () => {
    const Transitioner = createCanal(View);
    const testRenderer = TestRenderer.create(<Transitioner />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('throws an error if any arg is not a Component', () => {
    try {
      // @ts-ignore
      createCanal(View, 'aaa');
    } catch (error) {
      expect(error.message).toBe(
        '`createCanal` expects its arguments to be React components. Received type for argument 2: string'
      );
    }
    expect.assertions(1);
  });

  it('emits the new canal to the navigation store', () => {
    const PageOne = () => <View />;
    const PageTwo = () => <View />;
    const Transitioner = createCanal(PageOne, PageTwo);
    const expectedCanal = new Canal([PageOne, PageTwo]);
    Navigation.getInstance().canalsSubject.subscribe({
      next: canal => {
        expect(canal).toEqual(expectedCanal);
      },
    });
    TestRenderer.create(<Transitioner />);
    expect.assertions(1);
  });
});
