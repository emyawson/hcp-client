import { padArrayWithValue } from './array-pad';

describe('array-pad test suite', () => {
  it("should add two 0's", () => {
    const array = [1, 2, 3];
    expect(padArrayWithValue(array, 5, 0)).toEqual([...array, 0, 0]);
  });

  it('should not add anything', () => {
    const array = ['abc', 2, { a: 'b', c: 'd' }];
    expect(padArrayWithValue(array, 3, null)).toEqual(array);
  });
});
