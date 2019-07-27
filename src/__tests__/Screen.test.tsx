import React from 'react';
import { Text } from 'react-native';
import TestRenderer from 'react-test-renderer';
import { Screen } from '../Screen';
import { Subject } from 'rxjs';
import { BackEvent } from '../Navigation/BackHandlerDelegate';
import { BackContext } from '../Navigation/BackContext';
import { Navigation } from '../Navigation';

describe('Screen', () => {
  it('passes on back events which target itself', () => {
    const back$ = new Subject<BackEvent>();
    const spy = jest.fn();
    const testRenderer = TestRenderer.create(
      <BackContext.Provider value={{ back$ }}>
        <Screen Component={() => <Text>a</Text>} name="a" visible />
      </BackContext.Provider>
    );
    // @ts-ignore
    testRenderer.root.children[0].instance.back$.subscribe(spy);
    back$.next({ target: 'a' });
    expect(spy).toHaveBeenCalledWith({
      target: 'a',
    });
  });
  it('calls onBack callback when back events target itself', () => {
    const back$ = new Subject<BackEvent>();
    const onBackCallback = jest.fn();
    const spy = jest.spyOn(Navigation.instance.backHandlerDelegate, 'setOnBackCallback');
    TestRenderer.create(
      <BackContext.Provider value={{ back$ }}>
        <Screen Component={() => <Text>a</Text>} name="a" visible onBack={onBackCallback} />
      </BackContext.Provider>
    );
    // @ts-ignore
    back$.next({ target: 'a' });
    expect(spy).toHaveBeenCalledWith(onBackCallback);
  });
  it('blocks back events which do NOT target itself', () => {
    const back$ = new Subject<BackEvent>();
    const spy = jest.fn();
    const testRenderer = TestRenderer.create(
      <BackContext.Provider value={{ back$ }}>
        <Screen Component={() => <Text>a</Text>} name="a" visible />
      </BackContext.Provider>
    );
    // @ts-ignore
    testRenderer.root.children[0].instance.back$.subscribe(spy);
    back$.next({ target: 'b' });
    back$.next({ target: null });
    back$.next({ target: undefined });
    expect(spy).not.toHaveBeenCalled();
  });
  it('unsubscribe for back events when unmounted', () => {
    const back$ = new Subject<BackEvent>();
    const testRenderer = TestRenderer.create(
      <BackContext.Provider value={{ back$ }}>
        <Screen Component={() => <Text>a</Text>} name="a" visible />
      </BackContext.Provider>
    );
    // @ts-ignore
    const spy = jest.spyOn(testRenderer.root.children[0].instance.backSubscription, 'unsubscribe');
    testRenderer.update(<BackContext.Provider value={{ back$ }}></BackContext.Provider>);
    expect(spy).toHaveBeenCalled();
  });
});
