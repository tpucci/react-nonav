import BackHandler from 'react-native/Libraries/Utilities/__mocks__/BackHandler';
import { BackHandlerDelegate } from '../BackHandlerDelegate';

jest.mock('react-native', () => ({
  BackHandler: require.requireActual('react-native/Libraries/Utilities/__mocks__/BackHandler'),
}));

describe('BackHandlerDelegate', () => {
  it('exposes a root context which emits back events', () => {
    const backHandlerDelegate = new BackHandlerDelegate();
    backHandlerDelegate.defaultBackContext.back$.subscribe(event => {
      expect(event).toStrictEqual({ target: null });
    });
    BackHandler.mockPressBack();
    expect.assertions(1);
  });

  it('fires the registered onBackCallback after the hardware event has been handled', async () => {
    const spy = jest.fn();
    const backHandlerDelegate = new BackHandlerDelegate();
    backHandlerDelegate.setOnBackCallback(spy);
    backHandlerDelegate.defaultBackContext.back$.subscribe();
    BackHandler.mockPressBack();
    jest.runAllTimers();
    expect(spy).toHaveBeenCalled();
  });

  it('exposes a back method to emit a back event', () => {
    const backHandlerDelegate = new BackHandlerDelegate();
    backHandlerDelegate.defaultBackContext.back$.subscribe(event => {
      expect(event).toStrictEqual({ target: null });
    });
    backHandlerDelegate.back();
    expect.assertions(1);
  });

  it('fires the registered onBackCallback after the software event has been handled', async () => {
    const spy = jest.fn();
    const backHandlerDelegate = new BackHandlerDelegate();
    backHandlerDelegate.setOnBackCallback(spy);
    backHandlerDelegate.defaultBackContext.back$.subscribe();
    backHandlerDelegate.back();
    jest.runAllTimers();
    expect(spy).toHaveBeenCalled();
  });
});
