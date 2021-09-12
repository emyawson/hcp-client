import { spacing } from 'src/core';

import {
  applyRatioToRem,
  combineRems,
  convertPxToRem,
  invertRem,
  stripUnit,
} from './rem-calc';

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
  expect(convertPxToRem(input)).toBe(output);
});

test('convertPxToRem 3 no px', () => {
  const input = 3;
  const output = '0.1875rem';
  expect(convertPxToRem(input)).toBe(output);
});

test('convertPxToRem 0', () => {
  const input = '0';
  const output = 0;
  expect(convertPxToRem(input)).toBe(output);
});

test('combine 1, 2 rems to 3rems', () => {
  const output = '3rem';
  expect(combineRems('1rem', '2rem')).toBe(output);
});

test('combine spacing rems to 3rems', () => {
  const output = '3rem';
  expect(combineRems(spacing.three, spacing.four)).toBe(output);
});

test('invert 2rems', () => {
  const input = '2rem';
  const output = '-2rem';
  expect(invertRem(input)).toBe(output);
});

test('invert -2rems', () => {
  const input = '-2rem';
  const output = '2rem';
  expect(invertRem(input)).toBe(output);
});

test('Multiple rems by a given value', () => {
  const input = '4rem';
  const ratio = 0.25;
  expect(applyRatioToRem(input, ratio)).toBe('1rem');
});
