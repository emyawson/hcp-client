import { STATE_ACTIONS } from 'src/core';

import {
  GET_DELIVERY_STATUS_REQUEST,
  GET_DELIVERY_REQUEST,
  SAVE_DELIVERY_REQUEST,
  SET_DELIVERY_STATUS_REQUEST,
  GET_THRESHOLDS_REQUEST,
  GET_TIME_INTERVALS_REQUEST,
  TRAFFIC_LIGHT_STATES,
  GET_LAST_DELIVERY_STATUS_REQUEST,
  SAVE_DELIVERY_STATUS_COMMENT_REQUEST,
} from './strip-delivery.constants';

export const INITIAL_FORCE_STATUS_STATE = {
  status: null,
  comment: '',
};

export const INITIAL_CONDITIONS_STATE = {
  actualHypers: { pass: null, amount: null, threshold: null },
  hypers: { pass: null, amount: null, threshold: null },
  hypos: { pass: null, amount: null, threshold: null },
  warnings: { pass: null, amount: null, threshold: null },
  consumption: {
    pass: null,
    amount: null,
    threshold: null,
    percentConsumed: null,
  },
};

export const INITIAL_STRIP_DELIVERY_STATUS_STATE = {
  trafficLightStatus: TRAFFIC_LIGHT_STATES.DISABLED,
  trafficLightStatusId: null,
  trafficLightStatusDateCalculated: '',
  trafficLightStatusForced: null,
  trafficLightStatusConditions: INITIAL_CONDITIONS_STATE,
  trafficLightStatusComment: null,
  trafficLightStatusCommentState: null,
  numberOfStripsToDeliver: null,
  lastTrafficLightStatus: null,
  lastTrafficLightStatusConditions: INITIAL_CONDITIONS_STATE,
  lastTrafficLightStatusComment: null,
  lastTrafficLightStatusCommentState: null,
  lastStatusLastCollectedDate: null,
  lastNumberOfStripsToDeliver: null,
  lastTrafficLightStatusDateCalculated: null,
  lastDeliveryTrafficLightStatus: null,
};

export const INITIAL_STRIP_DELIVERY_STATE = {
  stripDeliveryInfo: {
    id: null,
    lastCollectedDate: '',
    prescriptionId: null,
    ...INITIAL_STRIP_DELIVERY_STATUS_STATE,
  },
  thresholds: {},
  timeIntervals: [],
  forceTrafficStatus: INITIAL_FORCE_STATUS_STATE,
};

export const stripDeliveryReducer = (
  state = INITIAL_STRIP_DELIVERY_STATE,
  action,
) => {
  switch (action.type) {
    case STATE_ACTIONS.CLEAR_STRIP_DELIVERY:
      return INITIAL_STRIP_DELIVERY_STATE;
    case GET_DELIVERY_STATUS_REQUEST.SUCCESS: {
      const {
        trafficLightStatus,
        trafficLightStatusId,
        trafficLightStatusDateCalculated,
        trafficLightStatusForced,
        trafficLightStatusConditions,
        trafficLightStatusComment,
        trafficLightStatusCommentState,
        numberOfStripsToDeliver,
      } = action.payload;
      return {
        ...state,
        forceTrafficStatus: INITIAL_FORCE_STATUS_STATE,
        stripDeliveryInfo: {
          ...state.stripDeliveryInfo,
          trafficLightStatus,
          trafficLightStatusId,
          trafficLightStatusDateCalculated,
          trafficLightStatusForced,
          trafficLightStatusConditions,
          trafficLightStatusComment,
          trafficLightStatusCommentState,
          numberOfStripsToDeliver,
        },
      };
    }
    case GET_DELIVERY_REQUEST.SUCCESS: {
      return {
        ...state,
        stripDeliveryInfo: {
          ...state.stripDeliveryInfo,
          id: action.payload.id,
          lastCollectedDate: action.payload.lastCollectedDate,
          prescriptionId: action.payload.prescriptionId,
          lastDeliveryTrafficLightStatus:
            action.payload.lastDeliveryTrafficLightStatus,
        },
      };
    }
    case GET_LAST_DELIVERY_STATUS_REQUEST.SUCCESS: {
      const {
        lastTrafficLightStatus,
        lastTrafficLightStatusConditions,
        lastTrafficLightStatusComment,
        lastTrafficLightStatusCommentState,
        lastNumberOfStripsToDeliver,
        lastTrafficLightStatusDateCalculated,
      } = action.payload;
      return {
        ...state,
        stripDeliveryInfo: {
          ...state.stripDeliveryInfo,
          lastTrafficLightStatus,
          lastTrafficLightStatusConditions,
          lastTrafficLightStatusComment,
          lastTrafficLightStatusCommentState,
          lastNumberOfStripsToDeliver,
          lastTrafficLightStatusDateCalculated,
        },
      };
    }
    case GET_TIME_INTERVALS_REQUEST.SUCCESS: {
      return {
        ...state,
        timeIntervals: action.payload,
      };
    }
    case GET_THRESHOLDS_REQUEST.SUCCESS: {
      return {
        ...state,
        thresholds: action.payload,
      };
    }
    case SAVE_DELIVERY_REQUEST.SUCCESS: {
      const { lastCollectedDate } = action.payload;
      const stripDeliveryInfo = {
        ...state.stripDeliveryInfo,
        ...INITIAL_STRIP_DELIVERY_STATUS_STATE,
        lastCollectedDate,
      };
      return {
        ...state,
        stripDeliveryInfo,
      };
    }
    case SET_DELIVERY_STATUS_REQUEST.SUCCESS: {
      return {
        ...state,
        forceTrafficStatus: INITIAL_FORCE_STATUS_STATE,
        stripDeliveryInfo: {
          ...state.stripDeliveryInfo,
          ...action.payload,
        },
      };
    }
    case SAVE_DELIVERY_STATUS_COMMENT_REQUEST.SUCCESS: {
      return {
        ...state,
        stripDeliveryInfo: {
          ...state.stripDeliveryInfo,
          trafficLightStatusId: action.payload.trafficLightStatusId,
        },
      };
    }
    default:
      return state;
  }
};
