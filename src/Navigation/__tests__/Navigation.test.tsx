import { Navigation } from '../Navigation';

describe('Navigation', () => {
  it('exposes the same store instance if it accessed twice', () => {
    const navigation = Navigation.instance;
    const otherNavigation = Navigation.instance;
    expect(otherNavigation).toBe(navigation);
  });

  it('exposes a back method to emit a back event', () => {
    Navigation.instance.backHandlerDelegate.defaultBackContext.back$.subscribe(event => {
      expect(event).toStrictEqual({ target: null });
    });
    Navigation.instance.back();
    expect.assertions(1);
  });
});
