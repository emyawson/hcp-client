import { standardDeviation } from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

export const getFormattedStandardDeviation = (
  data = [],
  transform = value => value,
) => {
  if (data.length <= 1) {
    return EMPTY_VALUE_PLACEHOLDER;
  }

  return transform(standardDeviation(data));
};
