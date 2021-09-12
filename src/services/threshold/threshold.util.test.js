import { transformServerThresholdsToThresholds } from './threshold.util';
import { mockThresholds } from './threshold.mock';

const transformedThresholdsByLimit = {
  actualHyper: {
    preIdealInterval: 240,
    postIdealInterval: 122,
    noctIdealInterval: 122,
  },
  hyper: {
    preIdealInterval: 125,
    postIdealInterval: 95,
    noctIdealInterval: 95,
  },
  hypo: {
    preIdealInterval: 60,
    postIdealInterval: 60,
    noctIdealInterval: 60,
  },
  warning: {
    preIdealInterval: 80,
    postIdealInterval: 80,
    noctIdealInterval: 80,
  },
};

test('Formats thresholds by limit', () => {
  expect(transformServerThresholdsToThresholds(mockThresholds)).toEqual(
    transformedThresholdsByLimit,
  );
});
