import {
  TRAFFIC_COLOR_MAP,
  TRAFFIC_LIGHT_STATES,
} from './strip-delivery.constants';

export const getTrafficLightColorFromStatus = trafficLightStatus =>
  TRAFFIC_COLOR_MAP[trafficLightStatus || TRAFFIC_LIGHT_STATES.DISABLED];
