import { translate } from 'src/i18n';
import { ALERTS_IDS } from 'src/core/alerts';

import {
  addThresholdValuesToMatchingRows,
  createRowsFromThresholdValues,
  calculateMmolPerLFromMgPerDL,
  createMmolPerLString,
  createMgPerDLString,
  createThresholdLimitString,
  createThresholdDisplayString,
} from './alerts.utils';

const { HYPO, UPPER, LOWER } = ALERTS_IDS;

const mockRows = {
  [HYPO]: {
    label: 'Hypo Label',
  },
  [UPPER]: {
    label: 'Hyper Label',
  },
  [LOWER]: {
    label: 'Warning Label',
  },
};

const mockThresholds = {
  hyperThresholds: {
    preIdealInterval: 125,
    postIdealInterval: 130,
    noctIdealInterval: 110,
  },
  hypoThresholds: {
    preIdealInterval: 80,
    postIdealInterval: 70,
    noctIdealInterval: 80,
  },
  warningThresholds: {
    preIdealInterval: 90,
    postIdealInterval: 85,
    noctIdealInterval: 90,
  },
};

test('Appropriate threshold values are merged with UI attributes', () => {
  expect(addThresholdValuesToMatchingRows(mockThresholds)(mockRows)).toEqual({
    [HYPO]: {
      ...mockRows[HYPO],
      values: mockThresholds.hypoThresholds,
    },
    [UPPER]: {
      ...mockRows[UPPER],
      values: mockThresholds.hyperThresholds,
    },
    [LOWER]: {
      ...mockRows[LOWER],
      values: mockThresholds.warningThresholds,
    },
  });
});

test('Appropriate threshold values are merged with UI attributes', () => {
  expect(createRowsFromThresholdValues(mockThresholds)(mockRows)).toEqual([
    {
      ...mockRows[HYPO],
      id: HYPO,
      values: mockThresholds.hypoThresholds,
    },
    {
      ...mockRows[UPPER],
      id: UPPER,
      values: mockThresholds.hyperThresholds,
    },
    {
      ...mockRows[LOWER],
      id: LOWER,
      values: mockThresholds.warningThresholds,
    },
  ]);
});

describe('Threshold display string: mmol/L from mg/dL', () => {
  it('should calculate mmol/L from mmg/dL', () => {
    expect(calculateMmolPerLFromMgPerDL(36)).toBe('2.0');
    expect(calculateMmolPerLFromMgPerDL(100)).toBe('5.6');
  });
  it('should create mmol/L string from value', () => {
    expect(createMmolPerLString(36)).toEqual(
      `(${calculateMmolPerLFromMgPerDL(36)} mmol/L)`,
    );
  });
  it('should create mmg/dl string from value', () => {
    expect(createMgPerDLString(99)).toEqual(`99 ${translate('units.mgPerDL')}`);
  });
  it('should create threshold limit string from value', () => {
    expect(createThresholdLimitString(72)).toEqual(
      `${createMgPerDLString(72)} ${createMmolPerLString(72)}`,
    );
  });
  it('should create threshold limit string if value is set', () => {
    expect(createThresholdDisplayString(99)).toEqual(
      createThresholdLimitString(99),
    );
  });
  it('should create placeholder str if value is not set', () => {
    expect(createThresholdDisplayString(null)).toEqual(
      translate('alerts.unavailable'),
    );
  });
});
