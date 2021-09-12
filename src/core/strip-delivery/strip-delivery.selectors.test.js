import { assocPath } from 'ramda';

import {
  selectNextDeliveryDate,
  selectLastStatusNextDeliveryDate,
  selectLastTrafficLightStatusDateCalculatedFormatted,
  selectHasForcedStatusComment,
  selectHasLastDeliveryWithAlert,
} from './strip-delivery.selectors';
import { TRAFFIC_LIGHT_STATES } from './strip-delivery.constants';
import { INITIAL_STRIP_DELIVERY_STATE } from './strip-delivery.reducers';

describe('Strip Delivery Core Selectors', () => {
  const mockInitialState = {
    stripDelivery: INITIAL_STRIP_DELIVERY_STATE,
  };
  const mockPrimaryPrescription = {
    id: 'abc-123',
    stripModel: '1',
    frequency: {
      unit: 'weeks',
      duration: 2,
    },
    prescriptionType: 'permanent',
  };
  const mockDeliveryRequestInfo = {
    id: 123,
    lastCollectedDate: '2018-05-01T00:00:00.000Z',
    prescriptionId: 'P123',
    lastDeliveryTrafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT,
  };
  const mockDeliveryStatusRequestInfo = {
    trafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT,
    trafficLightStatusId: '123',
    trafficLightStatusDateCalculated: '2017-12-02T18:21:03.182Z',
    trafficLightStatusForced: false,
    trafficLightStatusConditions: {
      hypers: { pass: true, amount: 4, threshold: 10 },
    },
    numberOfStripsToDeliver: 200,
  };
  const mockLastDeliveryStatusRequestInfo = {
    lastStatusLastCollectedDate: '2018-04-01T00:00:00.000Z',
    lastTrafficLightStatusDateCalculated: '2018-04-01T00:00:00.000Z',
  };

  describe('Next Delivery Date', () => {
    const mockState = {
      stripDelivery: {
        ...INITIAL_STRIP_DELIVERY_STATE,
        stripDeliveryInfo: {
          ...INITIAL_STRIP_DELIVERY_STATE.stripDeliveryInfo,
          ...mockDeliveryRequestInfo,
          ...mockDeliveryStatusRequestInfo,
          ...mockLastDeliveryStatusRequestInfo,
        },
      },
      prescription: {
        permanent: mockPrimaryPrescription,
        activePrescription: 'permanent',
      },
    };
    it('should calculate a next delivery date based on the delivery state and prescription', () => {
      expect(selectNextDeliveryDate(mockState)).toBe(
        '2018-05-15T00:00:00.000Z',
      );
      expect(selectNextDeliveryDate(mockInitialState)).toBe(null);
    });
    it('should calculate a delivery date based on the last status and current prescription', () => {
      expect(selectLastStatusNextDeliveryDate(mockState)).toBe(
        '2018-04-15T00:00:00.000Z',
      );
      expect(selectLastStatusNextDeliveryDate(mockInitialState)).toBe(null);
    });
    it('should format last status delivery date to be human readable', () => {
      expect(
        selectLastTrafficLightStatusDateCalculatedFormatted(mockState),
      ).toBe('1 April 2018');
    });
  });

  describe('Force Status Comment', () => {
    const mockState = {
      stripDelivery: {
        ...INITIAL_STRIP_DELIVERY_STATE,
        stripDeliveryInfo: {
          ...INITIAL_STRIP_DELIVERY_STATE.stripDeliveryInfo,
          ...mockDeliveryRequestInfo,
          ...mockDeliveryStatusRequestInfo,
          ...mockLastDeliveryStatusRequestInfo,
          trafficLightStatus: TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER,
          trafficLightStatusComment: 'This is a comment',
          trafficLightStatusCommentState: 'important',
          trafficLightStatusForced: true,
        },
      },
    };
    it('should show a force status comment if one is found and the current traffic light status is set', () => {
      expect(selectHasForcedStatusComment(mockState)).toBeTruthy();
    });
    it('should hide force status comment if one is found and the current traffic light status is disabled', () => {
      const mockDeliveryState = assocPath(
        ['stripDelivery', 'stripDeliveryInfo', 'trafficLightStatus'],
        TRAFFIC_LIGHT_STATES.DISABLED,
      )(mockState);
      expect(selectHasForcedStatusComment(mockDeliveryState)).toBeFalsy();
    });
    it('should hide force status comment if one is found but the status is not forced', () => {
      const mockDeliveryState = assocPath(
        ['stripDelivery', 'stripDeliveryInfo', 'trafficLightStatusForced'],
        false,
      )(mockState);
      expect(selectHasForcedStatusComment(mockDeliveryState)).toBeFalsy();
    });
  });
  describe('Delivery With Alert', () => {
    const mockState = {
      stripDelivery: {
        ...INITIAL_STRIP_DELIVERY_STATE,
        stripDeliveryInfo: {
          ...INITIAL_STRIP_DELIVERY_STATE.stripDeliveryInfo,
          ...mockDeliveryRequestInfo,
          ...mockDeliveryStatusRequestInfo,
          ...mockLastDeliveryStatusRequestInfo,
          trafficLightStatus: TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER,
        },
      },
    };
    it('should display an alert if the last delivery was performed with an alert, and strips can now not be delivered', () => {
      expect(selectHasLastDeliveryWithAlert(mockState)).toBeTruthy();
    });
    it('should not display delivery alert if orange/red status conditions are not met', () => {
      const mockDeliveryState = assocPath(
        ['stripDelivery', 'stripDeliveryInfo', 'trafficLightStatus'],
        TRAFFIC_LIGHT_STATES.DELIVER,
      )(mockState);
      expect(selectHasLastDeliveryWithAlert(mockDeliveryState)).toBeFalsy();
    });
  });
});
