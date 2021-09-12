import { map, toPairs, pipe, mergeAll, flatten } from 'ramda';

import { hasValue } from 'src/utils/validation-helpers';

import {
  TWO_WEEKS,
  ONE_MONTH,
  ONE_MONTH_HALF,
  TWO_MONTHS,
  THREE_MONTHS,
} from './frequencies.constant';

const frequencyToStringMap = {
  weeks: {
    '2': TWO_WEEKS,
    '6': ONE_MONTH_HALF,
  },
  months: {
    '1': ONE_MONTH,
    '2': TWO_MONTHS,
    '3': THREE_MONTHS,
  },
};

const createFrequencyObjectById = unit => ([duration, id]) => ({
  [id]: {
    duration: parseFloat(duration),
    unit,
  },
});

// Group frequency objects by unit of time
const createFrequenciesByUnit = ([unit, frequenciesByUnit]) =>
  pipe(
    toPairs,
    map(createFrequencyObjectById(unit)),
  )(frequenciesByUnit);

// Convert Frequency to String map to be keyed by frequency ID
// Flattens the grouped frequency objects created above
// Ex: {
//   twoWeeks: { duration: 2, unit: "weeks "}
//   twoMonths: { duration: 2, unit: "months "}
// }
const stringToFrequencyMap = pipe(
  toPairs,
  map(createFrequenciesByUnit),
  flatten,
  mergeAll,
)(frequencyToStringMap);

export const frequencyToString = frequency =>
  hasValue(frequency)
    ? frequencyToStringMap[frequency.unit][frequency.duration]
    : null;

export const stringToFrequency = frequencyStr =>
  hasValue(frequencyStr)
    ? stringToFrequencyMap[frequencyStr]
    : {
        duration: null,
        unit: null,
      };
