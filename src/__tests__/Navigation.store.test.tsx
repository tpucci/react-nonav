import { Navigation } from '../Navigation.store';

describe('Navigation store', () => {
  it('initializes with an empty state and canalsMap', () => {
    const navigation = new Navigation();
    expect(navigation.state).toEqual({});
    expect(navigation.canalsMap).toEqual({});
  });

  describe('state', () => {
    it('cannot be changed directly', () => {
      try {
        const navigation = new Navigation();
        navigation.state = {};
      } catch (error) {
        expect(error.message).toMatch(/\[mobx\]/);
      }
      expect.assertions(1);
    });
  });
});
