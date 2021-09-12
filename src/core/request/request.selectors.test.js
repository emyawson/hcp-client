import { createRequestHasErrorSelector } from './request.selectors';

const mockRequestName = 'GET_PATIENT_TESTER';
const mockErrorState = {
  [mockRequestName]: { status: 400, errorMessage: 'Invalid request' },
};

describe('error selector tests', () => {
  it('should return true if the state contains an error for the given request', () => {
    const getShouldDisplayLoader = createRequestHasErrorSelector(
      mockRequestName,
    ).resultFunc;
    expect(getShouldDisplayLoader(mockErrorState)).toEqual(true);
  });
  it('should return false if the state does not contain an error for the given request', () => {
    const getShouldDisplayLoader = createRequestHasErrorSelector(
      'GET_A_DIFFERENT_TEST_REQUEST',
    ).resultFunc;
    expect(getShouldDisplayLoader(mockErrorState)).toEqual(false);
  });
});
