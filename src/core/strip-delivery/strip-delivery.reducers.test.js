import { STATE_ACTIONS } from 'src/core';

import {
  GET_DELIVERY_STATUS_REQUEST,
  GET_DELIVERY_REQUEST,
  SAVE_DELIVERY_REQUEST,
  SET_DELIVERY_STATUS_REQUEST,
  TRAFFIC_LIGHT_STATES,
  GET_THRESHOLDS_REQUEST,
  GET_TIME_INTERVALS_REQUEST,
} from './strip-delivery.constants';
import {
  INITIAL_FORCE_STATUS_STATE,
  INITIAL_STRIP_DELIVERY_STATE,
  INITIAL_STRIP_DELIVERY_STATUS_STATE,
  stripDeliveryReducer,
} from './strip-delivery.reducers';

describe('Strip delivery reducer tests', () => {
  const mockDeliveryRequestInfo = {
    id: 123,
    lastCollectedDate: '2017-12-01T18:21:03.182Z',
    prescriptionId: 'P123',
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
  const mockState = {
    stripDeliveryInfo: {
      ...mockDeliveryRequestInfo,
      ...mockDeliveryStatusRequestInfo,
    },
    thresholds: {
      hyper: {
        preIdealInterval: 125,
        postIdealInterval: 130,
        noctIdealInteravl: 110,
      },
    },
    timeIntervals: [
      {
        id: 113,
        description: 'BEFORE_BREAKFAST',
        startTime: '05:00:00',
        endTime: '08:30:00',
      },
    ],
    forceTrafficStatus: {
      status: TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT,
      comment: 'override',
    },
  };

  it('returns the initial state', () => {
    expect(stripDeliveryReducer(undefined, {})).toEqual(
      INITIAL_STRIP_DELIVERY_STATE,
    );
  });

  it('clears all strip delivery data', () => {
    expect(
      stripDeliveryReducer(mockState, {
        type: STATE_ACTIONS.CLEAR_STRIP_DELIVERY,
      }),
    ).toEqual(INITIAL_STRIP_DELIVERY_STATE);
  });

  it('sets strip delivery info and default force traffic date on successful get delivery status', () => {
    expect(
      stripDeliveryReducer(mockState, {
        type: GET_DELIVERY_STATUS_REQUEST.SUCCESS,
        payload: {
          trafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER,
          numberOfStripsToDeliver: 100,
        },
      }),
    ).toEqual(
      expect.objectContaining({
        stripDeliveryInfo: expect.objectContaining({
          trafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER,
          numberOfStripsToDeliver: 100,
        }),
        forceTrafficStatus: INITIAL_FORCE_STATUS_STATE,
      }),
    );
  });

  it('sets delivery information on successful get delivery', () => {
    expect(
      stripDeliveryReducer(mockState, {
        type: GET_DELIVERY_REQUEST.SUCCESS,
        payload: {
          lastCollectedDate: '2018-02-09T00:00:00.000Z',
          id: '1',
          prescriptionId: '2',
        },
      }),
    ).toEqual({
      ...mockState,
      stripDeliveryInfo: {
        ...mockDeliveryRequestInfo,
        ...mockDeliveryStatusRequestInfo,
        lastCollectedDate: '2018-02-09T00:00:00.000Z',
        id: '1',
        prescriptionId: '2',
      },
    });
  });
  it('sets the time intervals', () => {
    expect(
      stripDeliveryReducer(mockState, {
        type: GET_TIME_INTERVALS_REQUEST.SUCCESS,
        payload: [
          {
            id: 113,
            description: 'BEFORE_LUNCH',
            startTime: '05:00:00',
            endTime: '09:30:00',
          },
        ],
      }),
    ).toEqual({
      ...mockState,
      timeIntervals: [
        {
          id: 113,
          description: 'BEFORE_LUNCH',
          startTime: '05:00:00',
          endTime: '09:30:00',
        },
      ],
    });
  });
  it('sets the thresholds', () => {
    expect(
      stripDeliveryReducer(mockState, {
        type: GET_THRESHOLDS_REQUEST.SUCCESS,
        payload: {
          hyper: {
            preIdealInterval: 115,
            postIdealInterval: 120,
            noctIdealInteravl: 100,
          },
        },
      }),
    ).toEqual({
      ...mockState,
      thresholds: {
        hyper: {
          preIdealInterval: 115,
          postIdealInterval: 120,
          noctIdealInteravl: 100,
        },
      },
    });
  });
  it('sets delivery information and resets entire traffic light status on successful save delivery', () => {
    expect(
      stripDeliveryReducer(mockState, {
        type: SAVE_DELIVERY_REQUEST.SUCCESS,
        payload: { lastCollectedDate: '2017-12-05T18:21:03.182Z' },
      }),
    ).toEqual({
      ...mockState,
      stripDeliveryInfo: {
        ...mockDeliveryRequestInfo,
        ...INITIAL_STRIP_DELIVERY_STATUS_STATE,
        lastCollectedDate: '2017-12-05T18:21:03.182Z',
      },
    });
  });
  it('sets delivery status information and resets force traffic state on successful set delivery status', () => {
    expect(
      stripDeliveryReducer(mockState, {
        type: SET_DELIVERY_STATUS_REQUEST.SUCCESS,
        payload: {
          trafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER,
        },
      }),
    ).toEqual({
      ...mockState,
      stripDeliveryInfo: {
        ...mockDeliveryRequestInfo,
        ...mockDeliveryStatusRequestInfo,
        trafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER,
      },
      forceTrafficStatus: INITIAL_FORCE_STATUS_STATE,
    });
  });
});
