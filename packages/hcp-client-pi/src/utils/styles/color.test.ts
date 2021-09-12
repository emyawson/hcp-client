import * as Color from './color';

describe('tests for color utils', () => {
  it('should have these functions defined', () => {
    expect(Color.blendHexColor).toBeDefined();
    expect(Color.hexToRgb).toBeDefined();
    expect(Color.hexToRgbString).toBeDefined();
    expect(Color.formatRGBA).toBeDefined();
    expect(Color.hexToRGBA).toBeDefined();
  });

  it('should have functions that work normally with expected values', () => {
    expect(Color.blendHexColor('blue', 1)).toBeDefined();
    expect(Color.hexToRgb('FFFFFF')).toBeDefined();
    expect(Color.hexToRgbString('FFFFFF')).toBeDefined();
    expect(Color.formatRGBA({ r: 1, g: 1, b: 1 }, 10)).toBeDefined();
    expect(Color.hexToRGBA('FFFFFF', 1)).toBeDefined();
  });
});
