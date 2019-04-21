import { Canal } from '../Canal';

describe('Canal', () => {
  it('initializes with a unique id', () => {
    const canal = new Canal();
    expect(canal.id).toEqual(0);
  });
});
