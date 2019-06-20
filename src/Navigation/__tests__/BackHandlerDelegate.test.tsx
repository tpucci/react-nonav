import BackHandler from 'react-native/Libraries/Utilities/__mocks__/BackHandler';
import { BackHandlerDelegate } from '../BackHandlerDelegate';

jest.mock('react-native', () => ({
  BackHandler: require.requireActual(
    'react-native/Libraries/Utilities/__mocks__/BackHandler'
  )
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
});
