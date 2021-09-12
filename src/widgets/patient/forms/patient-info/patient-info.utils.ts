import { add, map, mergeAll, pipe, propOr, reverse, toString } from 'ramda';

import { FormControlOption } from '../forms.types';

export const constructRangeArray = (
  max: number,
  offset: number = 0,
): number[] =>
  Array.from(new Array(max), (val, index) =>
    pipe(
      negateZeroIndex,
      add(offset),
    )(index),
  );

// Transforming Numeric Values

export const negateZeroIndex = add(1);

export const addLeadingZero = (val: number): string =>
  val < 10 ? `0${val}` : `${val}`;

// Formatting Values for Dropdowns

export const toDropdownOption = (
  label: string,
  value: string,
): FormControlOption => ({
  label,
  value,
});

export const valueToDropdownOption = (val: string): FormControlOption =>
  toDropdownOption(val, val);

export const getDropdownLabelByValue = (val: string) => (
  options: FormControlOption[],
) =>
  pipe(
    map(({ value, label }) => ({ [value]: label })),
    mergeAll,
    propOr('', val),
  )(options);

// Individual transforms for each dropdown list

export const convertDayToDropdownOption = (day: number): FormControlOption => {
  const label = pipe(addLeadingZero)(day);
  const value = toString(day);
  return toDropdownOption(label, value);
};

export const convertYearToDropdownOption = (year: number): FormControlOption =>
  pipe(
    toString,
    valueToDropdownOption,
  )(year);

// Build full lists of dropdown values

export const constructBirthDayDropdownOptions = (
  daysPerMonth: number,
): FormControlOption[] =>
  pipe(
    constructRangeArray,
    map(convertDayToDropdownOption),
  )(daysPerMonth);

export const constructBirthYearDropdownOptions = (
  yearsToDisplay: number,
  currentYear: number,
): FormControlOption[] =>
  pipe(
    map(convertYearToDropdownOption),
    reverse,
  )(constructRangeArray(yearsToDisplay, currentYear - yearsToDisplay));
