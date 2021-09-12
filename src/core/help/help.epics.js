import { GET_HELP_LINK } from './help.constants';

import { requestSequence } from '../request';

export const helpEpic = helpService =>
  requestSequence({
    actionTypes: GET_HELP_LINK,
    service: helpService,
  });
