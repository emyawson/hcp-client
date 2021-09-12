import { TRAFFIC_LIGHT_STATES } from 'src/core';

import {
  transformClientToServerTrafficLightStatus,
  transformServerToClientDeliveryStatus,
  clientToServerConditionTypes,
  calculatePercentConsumed,
} from './delivery-status.util';
import { SERVER_TRAFFIC_LIGHT_STATES } from './delivery-status.constant';

describe('Delivery status services utils', () => {
  describe('Traffic light status transform (client to server)', () => {
    it('Properly reshapes conditions', () => {
      const mockClientStatus = {
        conditions: {
          hypos: {
            pass: true,
            threshold: 6,
            amount: 0,
          },
        },
      };
      const expectedOutputConditions = [
        {
          type: clientToServerConditionTypes.hypos,
          pass: true,
          value: {
            threshold: 6,
            amount: 0,
          },
        },
      ];
      expect(
        transformClientToServerTrafficLightStatus(mockClientStatus),
      ).toEqual(
        expect.objectContaining({ conditions: expectedOutputConditions }),
      );
    });
  });
  describe('Delivery status transform (server to client)', () => {
    const mockServerStatus = {
      numberOfStripsToDeliver: 100,
      trafficLightStatus: {
        id: 1,
        status: SERVER_TRAFFIC_LIGHT_STATES.DELIVER,
        dateCalculated: '2018-02-27T00:00:00.000Z',
        forced: false,
        conditions: [
          {
            type: clientToServerConditionTypes.hypos,
            pass: true,
            value: {
              threshold: 6,
              amount: 0,
            },
          },
        ],
        comment: 'This is a comment',
        commentStatus: 'important',
      },
    };
    it('Properly transforms traffic light status', () => {
      const expectedStatus = {
        trafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER,
        trafficLightStatusId: 1,
        trafficLightStatusDateCalculated: '2018-02-27T00:00:00.000Z',
        trafficLightStatusForced: false,
        trafficLightStatusConditions: expect.any(Object),
        numberOfStripsToDeliver: 100,
        trafficLightStatusComment: expect.any(String),
        trafficLightStatusCommentState: expect.any(String),
      };
      expect(transformServerToClientDeliveryStatus(mockServerStatus)).toEqual(
        expectedStatus,
      );
    });
    it('Properly transforms conditions', () => {
      const expectedOutputConditions = {
        hypos: {
          pass: true,
          threshold: 6,
          amount: 0,
        },
      };
      expect(transformServerToClientDeliveryStatus(mockServerStatus)).toEqual(
        expect.objectContaining({
          trafficLightStatusConditions: expect.objectContaining(
            expectedOutputConditions,
          ),
        }),
      );
    });
  });
  describe('Percent consumed calculation transform util', () => {
    it('Returns percentage rounded down', () => {
      expect(calculatePercentConsumed(2, 3)).toEqual(66);
    });
    it('Null checks', () => {
      expect(calculatePercentConsumed(null, 3)).toEqual(null);
      expect(calculatePercentConsumed(2, null)).toEqual(null);
    });
  });
});
