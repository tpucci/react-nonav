import { last } from '../Array.last';

describe('Array.last', () => {
  it('returns null if arr is empty', () => {
    expect(last([])).toBeNull();
  });

  it('returns the last element of the list', () => {
    expect(last([1, 2, 3])).toBe(3);
  });
});
