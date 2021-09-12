import { GET_DTC_LINK } from './dtc.constants';

import { requestSequence } from '../request';

export const dtcEpic = dtcService =>
  requestSequence({
    actionTypes: GET_DTC_LINK,
    service: dtcService,
  });
