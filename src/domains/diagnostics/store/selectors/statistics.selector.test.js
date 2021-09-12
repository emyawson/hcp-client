import {
  makeOverwrite,
  convertISOToJsGMT,
} from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import { selectBGIndexes } from './statistics.selector';

const initialMockedState = {
  ui: {
    patientDashboard: {
      glucoseMeasurements: [
        {
          date: convertISOToJsGMT('Jan 1 2018 05:30:00 GMT+0000'),
          value: 81,
        },
        {
          date: convertISOToJsGMT('Jan 1 2018 06:30:00 GMT+0000'),
          value: 123,
        },
        {
          date: convertISOToJsGMT('Jan 1 2018 07:30:00 GMT+0000'),
          value: 101,
        },
        {
          date: convertISOToJsGMT('Jan 1 2018 16:30:00 GMT+0000'),
          value: 127,
        },
        {
          date: convertISOToJsGMT('Jan 1 2018 17:30:00 GMT+0000'),
          value: 90,
        },
      ],
    },
    patientDateRange: {
      startDate: convertISOToJsGMT('2018-01-01 00:30:00 GMT+0000'),
      endDate: convertISOToJsGMT('2018-04-01 07:30:00 GMT+0000'),
    },
  },
};

const overwriteMockedState = makeOverwrite(initialMockedState);

describe('selectBGIndexes test suite', () => {
  it('should return placeholder values for LBGI and HBGI when there are no glucose measurements', () => {
    const expected = {
      lbgi: EMPTY_VALUE_PLACEHOLDER,
      hbgi: EMPTY_VALUE_PLACEHOLDER,
    };

    const mockedState = overwriteMockedState({
      ui: { patientDashboard: { glucoseMeasurements: [] } },
    });

    expect(selectBGIndexes(mockedState)).toEqual(expected);
  });

  it('should correctly calculate LBGI and HBGI', () => {
    const expected = {
      lbgi: '1.2',
      hbgi: '0.2',
    };

    expect(selectBGIndexes(initialMockedState)).toEqual(expected);
  });
});
