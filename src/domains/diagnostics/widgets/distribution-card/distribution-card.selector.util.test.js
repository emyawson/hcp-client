import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import { returnZeroIfEmptyValueOrDivideBy100 } from './distribution-card.selector.util';

describe('returnZeroIfEmptyValueOrDivideBy100 test suite', () => {
  it('should return 0 if value is equal to the empty value placeholder', () => {
    expect(returnZeroIfEmptyValueOrDivideBy100(EMPTY_VALUE_PLACEHOLDER)).toBe(
      0,
    );
  });
  it('should return value / 100 if the value is not equal to the empty value placeholder', () => {
    expect(returnZeroIfEmptyValueOrDivideBy100(110)).toBe(1.1);
  });
});
