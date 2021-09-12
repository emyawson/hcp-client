import React from 'react';
import { shallow } from 'enzyme';

import { AlertsThresholdRow } from './alerts-threshold-row.component';

const mockThresholdData = {
  glucoseIdealIntervalMax: 125,
  glucoseIdealIntervalMin: 80,
  hypoglycemiaThreshold: 60,
};

const limitValueToString = thresholdData => valueKey => {
  if (!thresholdData[valueKey]) {
    return 'Unavailable';
  }
  // mmgdl / 18 = mmoldl
  const mmoldl = (thresholdData[valueKey] / 18).toFixed(1);
  return `${thresholdData[valueKey]} mmg/dL (${mmoldl} mmol/L)`;
};

const mockThresholdToInterval = mockThresholdData => {
  const mockLimitValueToString = limitValueToString(mockThresholdData);
  return {
    upperLimit: mockLimitValueToString('glucoseIdealIntervalMax'),
    lowerLimit: mockLimitValueToString('glucoseIdealIntervalMin'),
    thresholdHypo: mockLimitValueToString('hypoglycemiaThreshold'),
  };
};

describe('alerts-threshold-row test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <AlertsThresholdRow
        alertId="mockThresholdRow"
        intervalModelPath=".preIdealInterval"
        labelTextKey="alerts.preIdealInterval"
        values={mockThresholdToInterval(mockThresholdData)}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
