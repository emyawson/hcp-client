import * as Index from './index';

describe('tests imported and re-exported in index', () => {
  it('should define the following functions', () => {
    expect(true).toBe(true);
    expect(Index.addRemUnit).toBeDefined();
    expect(Index.combineRems).toBeDefined();
    expect(Index.convertPxToRem).toBeDefined();
    expect(Index.stripUnit).toBeDefined();
  });

  it('should have functions that work normally with expected values', () => {
    expect(Index.addRemUnit(1)).toBeDefined();
    expect(Index.combineRems(1)).toBeDefined();
    expect(Index.convertPxToRem(1)).toBeDefined();
    expect(Index.stripUnit(1)).toBeDefined();
  });
});
