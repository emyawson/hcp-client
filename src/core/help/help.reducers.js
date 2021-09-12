import { GET_HELP_LINK } from './help.constants';

export const INTIAL_HELP_STATE = {
  isLoading: false,
  url: '',
};

export const helpReducer = (state = INTIAL_HELP_STATE, action) => {
  switch (action.type) {
    case GET_HELP_LINK.START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_HELP_LINK.SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
