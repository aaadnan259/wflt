import { getRandom } from './utils.js';

describe('getRandom', () => {
  test('should return an item from the array', () => {
    const arr = ['apple', 'banana', 'cherry'];
    const result = getRandom(arr);
    expect(arr).toContain(result);
  });

  test('should return undefined for an empty array', () => {
    const arr = [];
    const result = getRandom(arr);
    expect(result).toBeUndefined();
  });

  test('should return the only item in a single-item array', () => {
    const arr = ['only item'];
    const result = getRandom(arr);
    expect(result).toBe('only item');
  });

  test('should be able to return all items over many iterations (stochastic test)', () => {
    const arr = [1, 2, 3];
    const seen = new Set();
    for (let i = 0; i < 100; i++) {
      seen.add(getRandom(arr));
    }
    expect(seen.size).toBe(3);
    expect(seen.has(1)).toBe(true);
    expect(seen.has(2)).toBe(true);
    expect(seen.has(3)).toBe(true);
  });
});
