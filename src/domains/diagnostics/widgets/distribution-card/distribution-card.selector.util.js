import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

export const returnZeroIfEmptyValueOrDivideBy100 = value => {
  if (value === EMPTY_VALUE_PLACEHOLDER) {
    return 0;
  }

  return value / 100;
};
