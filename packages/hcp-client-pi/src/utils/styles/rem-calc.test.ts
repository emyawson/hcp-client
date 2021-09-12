import { convertPxToRem, stripUnit } from './rem-calc';

const MOCK_BASE_FONT_SIZE = 16;

test('Strips unit from 100px', () => {
  const input = '100px';
  const output = 100;
  expect(stripUnit(input)).toBe(output);
});

test('Strips unit from 87.5%', () => {
  const input = '87.5%';
  const output = 87.5;
  expect(stripUnit(input)).toBe(output);
});

test('convertPxToRem 2rem', () => {
  const input = '32px';
  const output = '2rem';
  expect(convertPxToRem(MOCK_BASE_FONT_SIZE)(input)).toBe(output);
});

test('convertPxToRem 3 no px', () => {
  const input = 3;
  const output = '0.1875rem';
  expect(convertPxToRem(MOCK_BASE_FONT_SIZE)(input)).toBe(output);
});

test('convertPxToRem 0', () => {
  const input = '0';
  const output = 0;
  expect(convertPxToRem(MOCK_BASE_FONT_SIZE)(input)).toBe(output);
});
