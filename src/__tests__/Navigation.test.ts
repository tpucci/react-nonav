import { Navigation } from '../Navigation';

describe('Navigation store', () => {
  it('exposes the same store instance if it accessed twice', () => {
    const navigation = Navigation.instance;
    const otherNavigation = Navigation.instance;
    expect(otherNavigation).toBe(navigation);
  });
});
