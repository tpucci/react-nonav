import { Navigation } from '../Navigation.store';

describe('Navigation store', () => {
  it('exposes the same store instance if it accessed twice', () => {
    const navigation = Navigation.getInstance();
    const otherNavigation = Navigation.getInstance();
    expect(otherNavigation).toBe(navigation);
  });

  it('initializes with an empty state and canalsMap', () => {
    const navigation = new Navigation();
    // @ts-ignore
    expect(navigation.state).toEqual({});
    // @ts-ignore
    expect(navigation.canalsMap).toEqual({});
  });

  describe('state', () => {
    it('cannot be changed directly', () => {
      try {
        const navigation = new Navigation();
        // @ts-ignore
        navigation.state = {};
      } catch (error) {
        expect(error.message).toMatch(/\[mobx\]/);
      }
      expect.assertions(1);
    });
  });
});
