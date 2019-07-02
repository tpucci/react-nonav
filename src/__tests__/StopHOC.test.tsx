import React from 'react';
import { of } from 'rxjs';
import { View } from 'react-native';
import TestRenderer from 'react-test-renderer';

import { StopHOC } from '../StopHOC';
import { Navigation } from '../Navigation';

describe('StopHOC', () => {
  it('creates a Component which pipes back events and filter them based on name', () => {
    const spy = jest.fn();
    const initialEvent = { target: 'myComponent' };
    const back$ = of(initialEvent);
    const Stop = StopHOC({ back$ }, undefined, 'myComponent', View, undefined);
    const testRenderer = TestRenderer.create(<Stop />);
    testRenderer.root.instance.back$.subscribe(spy);
    expect(spy).toHaveBeenCalledWith(initialEvent);
  });

  it('creates a Component which pipes back events and filter them out based on name', () => {
    const spy = jest.fn();
    const initialEvent = { target: 'notMyComponent' };
    const back$ = of(initialEvent);
    const Stop = StopHOC({ back$ }, undefined, 'myComponent', View, undefined);
    const testRenderer = TestRenderer.create(<Stop />);
    testRenderer.root.instance.back$.subscribe(spy);
    expect(spy).not.toHaveBeenCalled();
  });

  it('creates a Component which register the onBack side effect in the Navigation\'s BackHandlerDelegate', () => {
    const onBackSpy = jest.fn();
    const setOnBackCallbackSpy = jest.spyOn(
      Navigation.instance.backHandlerDelegate,
      'setOnBackCallback'
    );
    const initialEvent = { target: 'myComponent' };
    const back$ = of(initialEvent);
    const Stop = StopHOC({ back$ }, onBackSpy, 'myComponent', View, undefined);
    const testRenderer = TestRenderer.create(<Stop />);
    testRenderer.root.instance.back$.subscribe();
    expect(setOnBackCallbackSpy).toHaveBeenCalledWith(onBackSpy);
  });
});
