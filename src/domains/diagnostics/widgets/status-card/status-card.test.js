import { shallow } from 'enzyme';
import React from 'react';

import { translate } from 'src/i18n';
import { TRAFFIC_LIGHT_COLORS } from 'src/domains/diagnostics/scenes/blood-glucose-overview/store';

import { StatusCard } from './status-card.component';
import { STATUS_LABELS } from './status-card.util.js';

const props = {
  threshold: {
    glucoseIdealIntervalMax: 125,
    glucoseIdealIntervalMin: 80,
    hypoglycemiaThreshold: 60,
  },
  hypoRisk: {
    value: {
      lbgi: 0.1,
      numberOfMeasurements: 4,
    },
    status: {
      color: TRAFFIC_LIGHT_COLORS.GREEN,
      sufficientInfo: true,
      label: translate(STATUS_LABELS.LOW),
    },
  },
  variability: {
    value: 11.2,
    status: {
      color: TRAFFIC_LIGHT_COLORS.GREEN,
      sufficientInfo: true,
      label: translate(STATUS_LABELS.LOW),
    },
  },
  meanBloodGlucose: {
    value: 115,
    status: {
      color: TRAFFIC_LIGHT_COLORS.GREEN,
      sufficientInfo: true,
      label: `${translate(STATUS_LABELS.WITHIN)} ${translate(
        STATUS_LABELS.TARGET_RANGE,
      )}`,
    },
  },
  hasReliableInfo: true,
  placeholderStatusLabel: true,
  showPlaceholderStatusLabelAndHideValues: false,
  showStatusLabels: true,
};

describe('StatusCard', () => {
  test('StatusCard renders correctly', () => {
    const wrapper = shallow(<StatusCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
