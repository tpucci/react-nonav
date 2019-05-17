import { Navigation } from '../Navigation';

describe('Navigation store', () => {
  it('exposes the same store instance if it accessed twice', () => {
    const navigation = Navigation.getInstance();
    const otherNavigation = Navigation.getInstance();
    expect(otherNavigation).toBe(navigation);
  });
});
