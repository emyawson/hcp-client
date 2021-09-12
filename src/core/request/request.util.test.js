import { addRequestError, removeRequestError } from './request.util';

const PATIENT_ID = 1289831245012369;
const DEMO_API_REQUEST = 'GET_DATA_FROM_API';
const DEMO_API_ERROR = 'Bad Request';

const INITIAL_STATE = {
  EXISTING_ERROR: 'Unauthorized',
};

const requestStartAction = {
  meta: {
    activity: 'REQUEST_START',
    base: DEMO_API_REQUEST,
  },
  payload: {
    id: 1234,
    patientId: PATIENT_ID,
  },
};

const requestErrorPayload = {
  bodyUsed: false,
  headers: {},
  ok: false,
  redirected: false,
  status: 400,
  statusText: DEMO_API_ERROR,
  type: 'Basic',
  url: 'http://localhost:3000/api-fail',
  errorCode: 'invalid-parameters',
};

const requestErrorAction = {
  meta: {
    activity: 'REQUEST_ERROR',
    base: DEMO_API_REQUEST,
  },
  payload: requestErrorPayload,
};

describe('Add Request Error', () => {
  it('Should add a request to the list and return the rest of the state intact', () => {
    expect(
      addRequestError({ action: requestErrorAction, state: INITIAL_STATE }),
    ).toEqual({
      ...INITIAL_STATE,
      [DEMO_API_REQUEST]: {
        status: requestErrorPayload.status,
        errorMessage: requestErrorPayload.statusText,
        errorCode: 'invalid-parameters',
      },
    });
  });
});

describe('Remove Request Error', () => {
  it('Should remove a request from list and return the rest of the state intact', () => {
    expect(
      removeRequestError({ action: requestStartAction, state: INITIAL_STATE }),
    ).toEqual({
      ...INITIAL_STATE,
    });
  });
});
