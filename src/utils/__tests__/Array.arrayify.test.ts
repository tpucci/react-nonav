import { arrayify } from '../Array.arrayify';

describe('Array.arrayify', () => {
  it('creates an array if arg is not an array', () => {
    const a = {};
    expect(arrayify(a)).toEqual([a]);
  });
  it('return an array if arg is an array', () => {
    const a = [{}];
    expect(arrayify(a)).toEqual(a);
  });
});
