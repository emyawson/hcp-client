import { createRequestActionTypes } from '../request';

export const CHANGE_LOCALE_ERROR = 'CHANGE_LOCALE_ERROR';
export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export const GET_CURRENT_USER_BASE = 'GET_CURRENT_USER';
export const GET_CURRENT_USER = createRequestActionTypes(GET_CURRENT_USER_BASE);
