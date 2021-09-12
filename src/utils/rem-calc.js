import { multiply, pipe } from 'ramda';

import { BASE_FONT_SIZE } from 'src/core/styles/font-sizes';

type fontSize = string | number;

// Decorate a number with the "rem" unit of measurement
export const addRemUnit = (value: number): string => `${value}rem`;

// Remove a unit of measurement (rem, em, px) from a number
export const stripUnit = (value: fontSize): number =>
  value ? parseFloat(value.toString().replace(/[^\d.-]/g, '')) : 0;

// Convert a font size in px to rems
// Default to unitless 0 if not available
export const convertPxToRem = (
  value: fontSize,
  base?: number = BASE_FONT_SIZE,
): fontSize => (stripUnit(value) ? addRemUnit(stripUnit(value) / base) : 0);

// Internal use only - tally a combination of rem values
const combineRemsReducer = (total, value) => total + stripUnit(value);

// Add up a set of rem values and return as an "rem" unit
// Use to combine values from the spacing system for edge cases
export const combineRems = (...values) =>
  addRemUnit(values.reduce(combineRemsReducer, 0));

// Return the inverse of a given rem value
// Useful for creating responsive negative margins
export const invertRem = (value: string): string =>
  addRemUnit(stripUnit(value) * -1);

export const applyRatioToRem = (value, ratio) =>
  pipe(
    stripUnit,
    multiply(ratio),
    addRemUnit,
  )(value);
