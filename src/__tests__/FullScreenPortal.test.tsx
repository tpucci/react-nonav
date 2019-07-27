import React from 'react';
import TestRenderer from 'react-test-renderer';

/**
 * import order is important between recompose and rxjs
 * @see https://stackoverflow.com/questions/53878650/you-provided-an-invalid-object-where-a-stream-was-expected-when-using-rxjs6-an.
 */
import 'recompose';
import { Subject } from 'rxjs';
import { View, Text } from 'react-native';

import { FullScreenPortal } from '../FullScreenPortal';
import { Navigation } from '../Navigation';
import { BackEvent } from '../Navigation/BackHandlerDelegate';
import { BackContext } from '../Navigation/BackContext';
import { Canal } from '../Canal';
import { Screen } from '../Screen';

describe('FullScreenPortal', () => {
  it('renders the full screen portal', () => {
    const testRenderer = TestRenderer.create(
      <FullScreenPortal>
        <View></View>
      </FullScreenPortal>
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('renders the full screen screens', () => {
    const testRenderer = TestRenderer.create(
      <FullScreenPortal>
        <View></View>
      </FullScreenPortal>
    );
    Navigation.instance.fullScreenDelegate.canalsFullScreenStackProperties$.next({
      canalId: '1',
      fullScreenStack: [
        <View key="a">
          <Text>I should be rendered</Text>
        </View>,
      ],
    });
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('passes on back events', () => {
    const back$ = new Subject<BackEvent>();
    const spy = jest.fn();
    const testRenderer = TestRenderer.create(
      <BackContext.Provider value={{ back$ }}>
        <FullScreenPortal>
          <Canal>
            <Screen Component={() => <Text>a</Text>} name="a" visible isFullScreen />
          </Canal>
        </FullScreenPortal>
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
        <FullScreenPortal>
          <Canal>
            <Screen Component={() => <Text>a</Text>} name="a" visible />
          </Canal>
        </FullScreenPortal>
      </BackContext.Provider>
    );
    // @ts-ignore
    testRenderer.root.children[0].instance.back$.subscribe(spy);
    back$.next({ target: null });
    expect(spy).toHaveBeenCalledWith({
      target: null,
    });
  });
});
