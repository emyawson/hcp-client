import { TRAFFIC_LIGHT_COLORS } from 'src/domains/diagnostics/scenes/blood-glucose-overview/store';
import { translate } from 'src/i18n';

import {
  STATUS_LABELS,
  toVariabilityStatus,
  toMeanStatus,
  toHypoRiskStatus,
} from './status-card.util.js';

describe('Status Card Utilities', () => {
  describe('toVariabilityStatus', () => {
    it('should return low label with green color', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: translate(STATUS_LABELS.LOW),
      };
      const actual = toVariabilityStatus(1, 2);
      expect(actual).toEqual(expected);
    });

    it('should return moderate label with yellow color', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: translate(STATUS_LABELS.MODERATE),
      };
      const actual = toVariabilityStatus(40, 2);
      expect(actual).toEqual(expected);
    });

    it('should return high label with red color', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.RED,
        label: translate(STATUS_LABELS.HIGH),
      };
      const actual = toVariabilityStatus(100, 2);
      expect(actual).toEqual(expected);
    });

    it('should return - label with gray color for null', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.GRAY,
        label: STATUS_LABELS.NONE,
      };
      const actual = toVariabilityStatus(null, 1);
      expect(actual).toEqual(expected);
    });

    it('should return - label with gray color if no values', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.GRAY,
        label: STATUS_LABELS.NONE,
      };
      const actual = toVariabilityStatus(0, 0);
      expect(actual).toEqual(expected);
    });
  });

  describe('toMeanStatus', () => {
    const thresholds = {
      glucoseIdealIntervalMin: 80,
      glucoseIdealIntervalMax: 120,
      hypoglycemiaThreshold: 40,
      upperHyperThreshold: 240,
    };

    it('should return within target range label with green color', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: `${translate(STATUS_LABELS.WITHIN)} ${translate(
          STATUS_LABELS.TARGET_RANGE,
        )}`,
      };
      const actual = toMeanStatus(90, 2, thresholds);
      expect(actual).toEqual(expected);
    });

    it('should return above target range label with yellow color', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: `${translate(STATUS_LABELS.ABOVE)} ${translate(
          STATUS_LABELS.TARGET_RANGE,
        )}`,
      };
      const actual = toMeanStatus(130, 2, thresholds);
      expect(actual).toEqual(expected);
    });

    it('should return above target range label with red color', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.RED,
        label: `${translate(STATUS_LABELS.ABOVE)} ${translate(
          STATUS_LABELS.TARGET_RANGE,
        )}`,
      };
      const actual = toMeanStatus(241, 2, thresholds);
      expect(actual).toEqual(expected);
    });

    it('should return below target range label with yellow color', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: `${translate(STATUS_LABELS.BELOW)} ${translate(
          STATUS_LABELS.TARGET_RANGE,
        )}`,
      };
      const actual = toMeanStatus(70, 2, thresholds);
      expect(actual).toEqual(expected);
    });

    it('should return below hypo limit label with red color', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.RED,
        label: `${translate(STATUS_LABELS.BELOW)} ${translate(
          STATUS_LABELS.HYPO_LIMIT,
        )}`,
      };
      const actual = toMeanStatus(20, 2, thresholds);
      expect(actual).toEqual(expected);
    });

    it('should return - label with gray color for null', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.GRAY,
        label: STATUS_LABELS.NONE,
      };
      const actual = toMeanStatus(null, 1, thresholds);
      expect(actual).toEqual(expected);
    });

    it('should return - label with gray color if no values', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.GRAY,
        label: STATUS_LABELS.NONE,
      };
      const actual = toMeanStatus(0, 0, thresholds);
      expect(actual).toEqual(expected);
    });
  });

  describe('toHypoRiskStatus', () => {
    it('should return low label with green color', () => {
      const hypoRisk = { lbgi: 0.5, numberOfMeasurements: 28 };
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: translate(STATUS_LABELS.LOW),
      };
      const actual = toHypoRiskStatus(hypoRisk);
      expect(actual).toEqual(expected);
    });

    it('should return medium label with yellow color', () => {
      const hypoRisk = { lbgi: 1.3, numberOfMeasurements: 28 };
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: translate(STATUS_LABELS.MEDIUM),
      };
      const actual = toHypoRiskStatus(hypoRisk);
      expect(actual).toEqual(expected);
    });

    it('should return high label with red color', () => {
      const hypoRisk = { lbgi: 2.6, numberOfMeasurements: 28 };
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.RED,
        label: translate(STATUS_LABELS.HIGH),
      };
      const actual = toHypoRiskStatus(hypoRisk);
      expect(actual).toEqual(expected);
    });

    it('should return - label with gray color for null', () => {
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.GRAY,
        label: STATUS_LABELS.NONE,
      };
      const actual = toHypoRiskStatus(null);
      expect(actual).toEqual(expected);
    });

    it('should return - label with gray color if no values', () => {
      const hypoRisk = { lbgi: 0, numberOfMeasurements: 0 };
      const expected = {
        color: TRAFFIC_LIGHT_COLORS.GRAY,
        label: STATUS_LABELS.NONE,
      };
      const actual = toHypoRiskStatus(hypoRisk);
      expect(actual).toEqual(expected);
    });
  });
});
