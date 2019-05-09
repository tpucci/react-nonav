import React, { ComponentType } from 'react';
import { View, Text } from 'react-native';
import TestRenderer from 'react-test-renderer';

import { createCanal } from '../createCanal';

const stopCreator = <T extends string>(
  name: T
): { name: T; Component: ComponentType } => {
  const Component = () => <Text>{name}</Text>;
  return { name, Component };
};

describe('createCanal', () => {
  it('throws an error if first arg is not a Component', () => {
    try {
      // @ts-ignore
      createCanal([{ name: 'a', Component: 'aaa' }]);
    } catch (error) {
      expect(error.message).toBe(
        '`createCanal` could not find a valid `Component` key for argument 1. Received: {"name":"a","Component":"aaa"}'
      );
    }
    expect.assertions(1);
  });

  it('renders nothing if no authorization is passed', () => {
    const Canal = createCanal([stopCreator('a')]);
    const testRenderer = TestRenderer.create(<Canal />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('renders the first page if authorization for first page is given', () => {
    const Canal = createCanal([stopCreator('a')]);
    const testRenderer = TestRenderer.create(<Canal a />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('renders the all pages if all authorizations are given', () => {
    const Canal = createCanal([stopCreator('a'), stopCreator('b')]);
    const testRenderer = TestRenderer.create(<Canal a b />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('renders only the first page if all authorizations are given but the one for the second page', () => {
    const Canal = createCanal([
      stopCreator('a'),
      stopCreator('b'),
      stopCreator('c')
    ]);
    const testRenderer = TestRenderer.create(<Canal a c />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('only rerender if style was modified', () => {
    const Canal = createCanal([
      stopCreator('a'),
      stopCreator('b'),
      stopCreator('c')
    ]);
    const testRenderer = TestRenderer.create(<Canal a />);
    const renderSpy = jest.spyOn(testRenderer.root.instance, 'render');
    testRenderer.update(<Canal a={false} />);
    expect(renderSpy).not.toHaveBeenCalled();
    testRenderer.update(<Canal a={false} style={{}} />);
    expect(renderSpy).toHaveBeenCalled();
  });

  it('throws an error if any arg is not a Component', () => {
    try {
      // @ts-ignore
      createCanal([stopCreator('a'), { name: 'b', Component: 'aaa' }]);
    } catch (error) {
      expect(error.message).toBe(
        '`createCanal` could not find a valid `Component` key for argument 2. Received: {"name":"b","Component":"aaa"}'
      );
    }
    expect.assertions(1);
  });

  it('throws an error if name is missing', () => {
    try {
      // @ts-ignore
      createCanal([{ Component: View }]);
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
      createCanal([stopCreator('a'), stopCreator('a')]);
    } catch (error) {
      expect(error.message).toBe(
        '`createCanal` found duplicated `name: a` key.'
      );
    }
    expect.assertions(1);
  });
});
