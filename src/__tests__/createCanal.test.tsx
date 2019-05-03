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
      createCanal({ name: 'a', Component: 'aaa' });
    } catch (error) {
      expect(error.message).toBe(
        '`createCanal` could not find a valid `Component` key for argument 1. Received: {"name":"a","Component":"aaa"}'
      );
    }
    expect.assertions(1);
  });

  it('renders the first page when mounted', () => {
    const Transitioner = createCanal({ name: 'a', Component: View });
    const testRenderer = TestRenderer.create(<Transitioner />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('throws an error if any arg is not a Component', () => {
    try {
      // @ts-ignore
      createCanal({ name: 'a', Component: View }, { name: 'b', Component: 'aaa' });
    } catch (error) {
      expect(error.message).toBe(
        '`createCanal` could not find a valid `Component` key for argument 2. Received: {"name":"b","Component":"aaa"}'
      );
    }
    expect.assertions(1);
  });

  it('emits the new canal to the navigation store', () => {
    const PageOne = () => <View />;
    const PageTwo = () => <View />;
    const Transitioner = createCanal(
      { name: 'pageOne', Component: PageOne },
      { name: 'pageTwo', Component: PageTwo }
    );
    const expectedCanal = new Canal([
      { name: 'pageOne', Component: PageOne },
      { name: 'pageTwo', Component: PageTwo },
    ]);
    Navigation.getInstance().canalsSubject.subscribe({
      next: canal => {
        expect(canal).toEqual(expectedCanal);
      },
    });
    TestRenderer.create(<Transitioner />);
    expect.assertions(1);
  });

  it('throws an error if name is missing', () => {
    try {
      // @ts-ignore
      createCanal({ Component: View });
    } catch (error) {
      expect(error.message).toBe(
        '`createCanal` could not find a valid `name` key for argument 1. Received: {}'
      );
    }
    expect.assertions(1);
  });

  // @TODO 19-08-01 Pass this test
  xit('throws an error some names are duplicated', () => {
    try {
      // @ts-ignore
      createCanal({ name: 'a', Component: View }, { name: 'a', Component: View });
    } catch (error) {
      expect(error.message).toBe('`createCanal` found duplicated `name: a` key.');
    }
    expect.assertions(1);
  });
});
