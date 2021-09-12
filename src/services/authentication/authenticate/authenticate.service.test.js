import { postJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  AuthenticateLoaderImpl,
  AuthenticateTransformImpl,
  AuthenticateServiceImpl,
} from './authenticate.service';
import { mockAuthenticateResponse } from './authenticate.mock';

const { REACT_APP_API_ROOT, REACT_APP_API_VERSION } = Config;

jest.mock('src/utils/loaders');

describe('Authenticate service', () => {
  const username = 'doctor';
  const password = 'pass';
  const responseTransform = AuthenticateTransformImpl;

  beforeEach(() => {
    postJSON.mockClear();
  });

  describe('Loader implementation', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    postJSON.mockResolvedValue(mockAuthenticateResponse);
    it('should call the API url with username and password', done => {
      expect.assertions(1);

      AuthenticateLoaderImpl(username, password).then(data => {
        expect(postJSON).toBeCalledWith(`${BASE_URL}/authenticate`, {
          username,
          password,
        });
        done();
      });
    });
  });

  describe('Transform implementation', () => {
    it('Shapes the response data as needed to be consumed on FE', () => {
      const transformed = AuthenticateTransformImpl(mockAuthenticateResponse);
      expect(transformed).toEqual(
        expect.objectContaining({
          token: mockAuthenticateResponse.token,
          firstTime: mockAuthenticateResponse.firstAccess,
          tempPassword: mockAuthenticateResponse.tempPassword,
          securityQuestions: mockAuthenticateResponse.securityQuestionOptions,
        }),
      );
    });
  });

  describe('Service implementation', () => {
    it('Should apply a transform to the service response', done => {
      expect.assertions(1);

      AuthenticateServiceImpl(postJSON, responseTransform)({
        email: username,
        password,
      }).then(result => {
        expect(result).toEqual(responseTransform(mockAuthenticateResponse));
        done();
      });
    });
  });
});
