import { getZIndexScaleByKey, getZIndexScaleByValue } from 'src/theme/z-index';

describe('z-index test utilities', () => {
  it('should get the z-index scale by key', () => {
    expect(getZIndexScaleByKey('popover')).toBe('three');
  });
  it('should get the z-index scale by value', () => {
    expect(getZIndexScaleByValue(300)).toBe('three');
  });
});
