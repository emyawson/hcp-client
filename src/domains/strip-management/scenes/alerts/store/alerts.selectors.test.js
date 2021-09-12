import { mapDataByTime } from './alerts.selectors';

import { createThresholdDisplayString } from '../alerts.utils';

const mockThresholdsGroup = {
  noctIdealInterval: 125,
  postIdealInterval: 120,
  preIdealInterval: 90,
};

describe('Alerts Scene selector tests', () => {
  it('should reorganize thresholds data by time of day', () => {
    expect(mapDataByTime(mockThresholdsGroup)).toEqual({
      preIdealInterval: createThresholdDisplayString(
        mockThresholdsGroup.preIdealInterval,
      ),
      postIdealInterval: createThresholdDisplayString(
        mockThresholdsGroup.postIdealInterval,
      ),
      noctIdealInterval: createThresholdDisplayString(
        mockThresholdsGroup.noctIdealInterval,
      ),
    });
  });
});
