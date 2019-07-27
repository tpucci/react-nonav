import React from 'react';
import { Text, View } from 'react-native';
import TestRenderer from 'react-test-renderer';
import { Canal } from '../Canal';
import { Screen } from '../Screen';
import { Subject } from 'rxjs';
import { BackEvent } from '../Navigation/BackHandlerDelegate';
import { BackContext } from '../Navigation/BackContext';
import { Navigation } from '../Navigation';

describe('Canal', () => {
  it('renders its children', () => {
    const testRenderer = TestRenderer.create(
      <Canal>
        <Screen Component={() => <Text>a</Text>} name="a" visible />
        <Screen Component={() => <Text>b</Text>} name="b" visible />
      </Canal>
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
  it('renders its only child', () => {
    const testRenderer = TestRenderer.create(
      <Canal>
        <Screen Component={() => <Text>a</Text>} name="a" visible />
      </Canal>
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
  it('renders only non-fullscreen children', () => {
    const testRenderer = TestRenderer.create(
      <Canal>
        <Screen Component={() => <Text>a</Text>} name="a" visible />
        <Screen Component={() => <Text>b</Text>} name="b" visible isFullScreen />
      </Canal>
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
  it('notifies the fullScreenDelegate of the full-screen screens after any render', () => {
    const spy = jest.spyOn(
      Navigation.instance.fullScreenDelegate.canalsFullScreenStackProperties$,
      'next'
    );
    const ScreenB = <Screen Component={() => <Text>b</Text>} name="b" visible isFullScreen />;
    const testRenderer = TestRenderer.create(
      <Canal>
        <Screen Component={() => <Text>a</Text>} name="a" visible />
        {ScreenB}
      </Canal>
    );
    expect(spy).toHaveBeenCalledWith({ canalId: '0', fullScreenStack: [ScreenB] });
    const ScreenC = (
      <Screen Component={() => <Text>c</Text>} name="c" visible={false} isFullScreen />
    );
    testRenderer.update(
      <Canal>
        <Screen Component={() => <Text>a</Text>} name="a" visible />
        {ScreenC}
      </Canal>
    );
    expect(spy).toHaveBeenCalledWith({ canalId: '0', fullScreenStack: [ScreenC] });
  });
  it('notifies the fullScreenDelegate on unmount', () => {
    const spy = jest.spyOn(
      Navigation.instance.fullScreenDelegate.canalsFullScreenStackProperties$,
      'next'
    );
    const ScreenB = <Screen Component={() => <Text>b</Text>} name="b" visible isFullScreen />;
    const testRenderer = TestRenderer.create(
      <Canal>
        <Screen Component={() => <Text>a</Text>} name="a" visible />
        {ScreenB}
      </Canal>
    );
    expect(spy).not.toHaveBeenCalledWith({ canalId: '0', fullScreenStack: [] });
    expect(spy).toHaveBeenCalledWith({ canalId: '0', fullScreenStack: [ScreenB] });
    testRenderer.update(<View></View>);
    expect(spy).toHaveBeenCalledWith({ canalId: '0', fullScreenStack: [] });
  });
  it('passes back events on', () => {
    const back$ = new Subject<BackEvent>();
    const spy = jest.fn();
    const testRenderer = TestRenderer.create(
      <BackContext.Provider value={{ back$ }}>
        <Canal>
          <Screen Component={() => <Text>a</Text>} name="a" visible={true} />
          <Screen Component={() => <Text>b</Text>} name="b" visible={false} />
        </Canal>
      </BackContext.Provider>
    );
    // @ts-ignore
    testRenderer.root.children[0].instance.back$.subscribe(spy);
    back$.next({ target: null });
    expect(spy).toHaveBeenCalledWith({
      target: 'a',
    });
    testRenderer.update(
      <BackContext.Provider value={{ back$ }}>
        <Canal>
          <Screen Component={() => <Text>a</Text>} name="a" visible={true} />
          <Screen Component={() => <Text>b</Text>} name="b" visible={true} />
        </Canal>
      </BackContext.Provider>
    );
    back$.next({ target: null });
    expect(spy).toHaveBeenCalledWith({
      target: 'b',
    });
    testRenderer.update(
      <BackContext.Provider value={{ back$ }}>
        <Canal>
          <Screen Component={() => <Text>a</Text>} name="a" visible={false} />
          <Screen Component={() => <Text>b</Text>} name="b" visible={false} />
        </Canal>
      </BackContext.Provider>
    );
    back$.next({ target: null });
    expect(spy).toHaveBeenCalledWith({
      target: null,
    });
  });
});
