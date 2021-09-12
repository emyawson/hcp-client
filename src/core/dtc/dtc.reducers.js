import { GET_DTC_LINK } from './dtc.constants';

export const INITIAL_DTC_STATE = {
  url: '',
};

export const dtcReducer = (state = INITIAL_DTC_STATE, action) => {
  switch (action.type) {
    case GET_DTC_LINK.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
