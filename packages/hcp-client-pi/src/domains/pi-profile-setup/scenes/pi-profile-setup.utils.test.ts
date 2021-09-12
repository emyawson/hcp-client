import { findSelectOptionByValue } from './pi-profile-setup.utils';

describe('findSelectOptionByValue test suite ', () => {
  const mockArray = [{ label: '', value: 1 }, { label: '', value: 2 }, { label: '', value: 3 }];
  it('Should return object containing value, or undefined if not found', () => {
    expect(findSelectOptionByValue(mockArray, 1)).toBe(mockArray[0]);
    expect(findSelectOptionByValue(mockArray, 2)).toBe(mockArray[1]);
    expect(findSelectOptionByValue(mockArray, 3)).toBe(mockArray[2]);
    expect(findSelectOptionByValue(mockArray, 4)).toBe(undefined);
  });
});
