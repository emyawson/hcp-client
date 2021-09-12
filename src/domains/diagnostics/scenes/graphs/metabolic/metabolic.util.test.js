import { shouldTickShow, createThresholdTicks } from './metabolic.util';

describe('Metabolic Rate utility method tests', () => {
  it('should return true when the distance is greater than tolerance', () => {
    const tickValue = 50;
    const thresholds = {
      glucoseIdealIntervalMax: 120,
      glucoseIdealIntervalMin: 100,
      hypoglycemiaThreshold: 80,
    };
    const tolerance = 10;
    expect(shouldTickShow(tickValue, thresholds, tolerance)).toBe(true);
  });

  it('should return false when the distance is lesser than tolerance', () => {
    const tickValue = 50;
    const thresholds = {
      glucoseIdealIntervalMax: 120,
      glucoseIdealIntervalMin: 100,
      hypoglycemiaThreshold: 80,
    };
    const tolerance = 75;
    expect(shouldTickShow(tickValue, thresholds, tolerance)).toBe(false);
  });

  it('should return all 3 threshold ticks when the difference between is more than tolerance', () => {
    const thresholds = {
      glucoseIdealIntervalMax: 120,
      glucoseIdealIntervalMin: 80,
      hypoglycemiaThreshold: 60,
    };
    const tolerance = 10;
    const maxY = 400;
    expect(createThresholdTicks(thresholds, tolerance, maxY).length).toBe(3);
  });

  it('should not return ideal min when the difference to ideal max is lesser than the tolerance', () => {
    const thresholds = {
      glucoseIdealIntervalMax: 120,
      glucoseIdealIntervalMin: 115,
      hypoglycemiaThreshold: 60,
    };
    const tolerance = 10;
    const maxY = 400;
    expect(createThresholdTicks(thresholds, tolerance, maxY).length).toBe(2);
  });

  it('should not return ideal min when the difference to hypo is lesser than the tolerance', () => {
    const thresholds = {
      glucoseIdealIntervalMax: 120,
      glucoseIdealIntervalMin: 65,
      hypoglycemiaThreshold: 60,
    };
    const tolerance = 10;
    const maxY = 400;
    expect(createThresholdTicks(thresholds, tolerance, maxY).length).toBe(2);
  });
});
