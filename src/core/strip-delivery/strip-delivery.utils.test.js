import { colors } from 'src/core/styles/colors';
import { convertISO, isAfter, now } from 'src/utils/date';

import { TRAFFIC_LIGHT_STATES } from './strip-delivery.constants';
import {
  calculateNextDeliveryDate,
  calculateNewPatientDeliveryDate,
  convertStripConsumptionToTrafficLightState,
  convertStripConsumptionToTrafficLightColor,
  getTrafficLightColorFromStatus,
  addTime,
  convertDateStringToDateTime,
} from './strip-delivery.utils';

const {
  DELIVER,
  DELIVER_WITH_ALERT,
  DO_NOT_DELIVER,
  DISABLED,
} = TRAFFIC_LIGHT_STATES;

describe('Convert strip consumption to traffic light state util tests', () => {
  test('Null consumption returns disabled', () => {
    expect(convertStripConsumptionToTrafficLightState(null)).toBe(DISABLED);
  });

  test('Out of range low values return do not deliver', () => {
    expect(convertStripConsumptionToTrafficLightState(5)).toBe(DO_NOT_DELIVER);
  });

  test('Low edge value returns do not deliver', () => {
    expect(convertStripConsumptionToTrafficLightState(69)).toBe(DO_NOT_DELIVER);
  });

  test('Mid edge value (low) returns deliver with alert', () => {
    expect(convertStripConsumptionToTrafficLightState(70)).toBe(
      DELIVER_WITH_ALERT,
    );
  });

  test('Mid values return deliver with alert', () => {
    expect(convertStripConsumptionToTrafficLightState(75)).toBe(
      DELIVER_WITH_ALERT,
    );
  });

  test('Mid edge value (high) returns deliver with alert', () => {
    expect(convertStripConsumptionToTrafficLightState(79)).toBe(
      DELIVER_WITH_ALERT,
    );
  });

  test('High edge value returns deliver', () => {
    expect(convertStripConsumptionToTrafficLightState(80)).toBe(DELIVER);
  });

  test('High value returns deliver', () => {
    expect(convertStripConsumptionToTrafficLightState(88)).toBe(DELIVER);
  });

  test('Max value returns deliver', () => {
    expect(convertStripConsumptionToTrafficLightState(100)).toBe(DELIVER);
  });

  test('Out of range high values return do not deliver', () => {
    expect(convertStripConsumptionToTrafficLightState(125)).toBe(
      DO_NOT_DELIVER,
    );
  });

  test('Out of range high values return do not deliver', () => {
    expect(convertStripConsumptionToTrafficLightState(125)).toBe(
      DO_NOT_DELIVER,
    );
  });
});

describe('Strip delivery add time util tests', () => {
  test('Correctly adds 1 month', () => {
    const startDate = convertDateStringToDateTime('2018-02-06T00:00:00.000Z');
    const expectedDate = convertDateStringToDateTime(
      '2018-03-08T00:00:00.000Z',
    );
    expect(addTime(1, 'months')(startDate)).toEqual(expectedDate);
  });
  test('Correctly adds 1 week', () => {
    const startDate = convertDateStringToDateTime('2018-02-06T00:00:00.000Z');
    const expectedDate = convertDateStringToDateTime(
      '2018-02-13T00:00:00.000Z',
    );
    expect(addTime(1, 'weeks')(startDate)).toEqual(expectedDate);
  });
  test('Correctly adds 1 day', () => {
    const startDate = convertDateStringToDateTime('2018-02-06T00:00:00.000Z');
    const expectedDate = convertDateStringToDateTime(
      '2018-02-07T00:00:00.000Z',
    );
    expect(addTime(1, 'days')(startDate)).toEqual(expectedDate);
  });
  test('Returns original date for invalid unit', () => {
    const startDate = convertDateStringToDateTime('2018-02-06T00:00:00.000Z');
    expect(addTime(1, 'years')(startDate)).toEqual(startDate);
  });
});

describe('Calculate next delivery date util tests', () => {
  test('Correctly calculates Next Delivery Date for frequency of 1 month', () => {
    const startDate = '2018-02-06T00:00:00.000Z';
    const expectedDate = '2018-03-08T00:00:00.000Z';
    const frequency = {
      duration: 1,
      unit: 'months',
    };
    expect(calculateNextDeliveryDate(startDate, frequency)).toEqual(
      expectedDate,
    );
  });

  test('Correctly calculates Next Delivery Date for valid date', () => {
    const startDate = '2018-01-01T00:00:00.000Z';
    const expectedDate = '2018-03-03T00:00:00.000Z';
    // Days added: 61
    const frequency = {
      duration: 2,
      unit: 'months',
    };
    expect(calculateNextDeliveryDate(startDate, frequency)).toEqual(
      expectedDate,
    );
  });

  test('Returns null for a null last collected date', () => {
    expect(
      calculateNextDeliveryDate(null, { duration: 2, unit: 'weeks' }),
    ).toEqual(null);
  });

  test('Returns null for a empty last collected date', () => {
    expect(
      calculateNextDeliveryDate('', { duration: 2, unit: 'weeks' }),
    ).toEqual(null);
  });
  test("Calculates next delivery date for a new patient using today's date", () => {
    const frequency = {
      duration: 2,
      unit: 'months',
    };
    const newDate = calculateNewPatientDeliveryDate(frequency);
    const newDateTime = convertISO(newDate);
    expect(isAfter(newDateTime, now())).toBeTruthy();
  });
});

describe('Convert strip consumption to traffic light color util tests', () => {
  test('Null consumption returns grey', () => {
    expect(convertStripConsumptionToTrafficLightColor(null)).toBe(
      colors.grayLight,
    );
  });

  test('Out of range low values return red', () => {
    expect(convertStripConsumptionToTrafficLightColor(5)).toBe(
      colors.trafficRed,
    );
  });

  test('Mid values return orange', () => {
    expect(convertStripConsumptionToTrafficLightColor(75)).toBe(
      colors.trafficOrange,
    );
  });

  test('High value returns green', () => {
    expect(convertStripConsumptionToTrafficLightColor(88)).toBe(
      colors.trafficGreen,
    );
  });

  test('Max value returns green', () => {
    expect(convertStripConsumptionToTrafficLightColor(100)).toBe(
      colors.trafficGreen,
    );
  });

  test('Out of range high values return red', () => {
    expect(convertStripConsumptionToTrafficLightColor(125)).toBe(
      colors.trafficRed,
    );
  });
});

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
