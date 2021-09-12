import { colors } from 'src/domains/diagnostics/styles';

import { TRAFFIC_LIGHT_STATES } from './strip-delivery.constants';
import { getTrafficLightColorFromStatus } from './strip-delivery.utils';

describe('Get traffic light color from status util tests', () => {
  test('Null status returns gray', () => {
    expect(getTrafficLightColorFromStatus(null)).toEqual(colors.grayLight);
  });
  test('Valid status returns correct color', () => {
    expect(
      getTrafficLightColorFromStatus(TRAFFIC_LIGHT_STATES.DELIVER),
    ).toEqual(colors.trafficGreen);
  });
});
