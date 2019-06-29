import React from 'react';
import { View } from 'react-native';
import TestRenderer from 'react-test-renderer';

import { stopCreator } from './utils/stopCreator';

import { createCanal } from '../createCanal';
import { Subject } from 'rxjs';
import { BackContext } from '../Navigation/BackContext';
import { IBackEvent } from '../Navigation/BackHandlerDelegate';

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
    const renderSpy = jest.spyOn(
      // @ts-ignore
      testRenderer.root.children[0].instance,
      'render'
    );
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

  it('emits new fullscreen stack only when fullscreen stack has changed', () => {
    const spy = jest.fn();
    const stopB = stopCreator('b', true);
    const Canal = createCanal([stopCreator('a'), stopB]);
    const testRenderer = TestRenderer.create(<Canal a />);
    // @ts-ignore
    testRenderer.root.children[0].instance.fullScreenStackProperties$.subscribe(
      spy
    );
    // @ts-ignore
    const [_, StopB] = testRenderer.root.children[0].instance.stopsList;
    testRenderer.update(<Canal a />);
    testRenderer.update(<Canal a />);
    testRenderer.update(<Canal a b />);
    testRenderer.update(<Canal a b />);
    testRenderer.update(<Canal a b />);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      canalId: '0',
      fullScreenStack: []
    });
    expect(spy).toHaveBeenCalledWith({
      canalId: '0',
      fullScreenStack: [StopB]
    });
  });

  it('emits empty fullscreen stack when unmounted', () => {
    const spy = jest.fn();
    const Canal = createCanal([stopCreator('a'), stopCreator('b', true)]);
    const testRenderer = TestRenderer.create(<Canal a />);
    // @ts-ignore
    testRenderer.root.children[0].instance.fullScreenStackProperties$.subscribe(
      spy
    );
    // @ts-ignore
    const [_, StopB] = testRenderer.root.children[0].instance.stopsList;
    testRenderer.update(<Canal a b />);
    testRenderer.update(<View />);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      canalId: '0',
      fullScreenStack: [StopB]
    });
    expect(spy).toHaveBeenCalledWith({
      canalId: '0',
      fullScreenStack: []
    });
  });

  it('passes back events on', () => {
    const back$ = new Subject<IBackEvent>();
    const spy = jest.fn();
    const Canal = createCanal([stopCreator('a'), stopCreator('b')]);
    const testRenderer = TestRenderer.create(
      <BackContext.Provider value={{ back$ }}>
        <Canal a />
      </BackContext.Provider>
    );
    testRenderer.update(
      <BackContext.Provider value={{ back$ }}>
        <Canal a b />
      </BackContext.Provider>
    );
    // @ts-ignore
    testRenderer.root.children[0].instance.back$.subscribe(spy);
    back$.next({ target: null });
    expect(spy).toHaveBeenCalledWith({
      target: 'b'
    });
    testRenderer.update(
      <BackContext.Provider value={{ back$ }}>
        <Canal />
      </BackContext.Provider>
    );
    back$.next({ target: null });
    expect(spy).toHaveBeenCalledWith({
      target: null
    });
  });
});
