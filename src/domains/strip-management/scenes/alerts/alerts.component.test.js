import React from 'react';
import { shallow } from 'enzyme';

import { ALERTS_IDS } from 'src/core/alerts';

import { Alerts } from './alerts.component';
import { createRowsFromThresholdValues } from './alerts.utils';
import { alertThresholdRowDetails } from './alerts.constants';

const mockThresholds = {
  noctIdealInterval: '125 mmg/DL (6.9 mmol/L',
  postIdealInterval: '125 mmg/DL (6.9 mmol/L',
  preIdealInterval: '125 mmg/DL (6.9 mmol/L',
};

const props = {
  onSaveAlerts: () => {},
  hasAlerts: false,
  attachDispatch: () => {},
  onUpdateThresholdLimit: () => {},
  alertSettings: {
    [ALERTS_IDS.HYPO]: {
      active: true,
      thresholdLimit: 80,
    },
    [ALERTS_IDS.UPPER]: {
      active: true,
      thresholdLimit: 80,
    },
    [ALERTS_IDS.LOWER]: {
      active: true,
      thresholdLimit: 120,
    },
  },
  alertThresholdRows: createRowsFromThresholdValues({
    hypoThresholds: mockThresholds,
    hyperThresholds: mockThresholds,
    warningThresholds: mockThresholds,
  })(alertThresholdRowDetails),

  thresholdsHasError: false,
};

describe('Alerts component', () => {
  it('renders correctly', () => {
    const component = shallow(<Alerts {...props} />);
    expect(component).toMatchSnapshot();
  });
});
