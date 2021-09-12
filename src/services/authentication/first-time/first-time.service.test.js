import { postJSON } from 'src/utils';
import { Config } from 'src/core';

import {
  FirstTimeLoaderImpl,
  FirstTimeTransformImpl,
  FirstTimeService,
} from './first-time.service';
import { mockFirstTimeResponse } from './first-time.mock';

const { REACT_APP_API_ROOT, REACT_APP_API_VERSION } = Config;

jest.mock('src/utils/loaders');

describe('First time service', () => {
  const chosenQuestion = "What was your first pet's name?";
  const answer = 'Dog';
  const oldPassword = 'oldpass';
  const newPassword = 'newpass';
  const responseTransform = FirstTimeTransformImpl;
  const token = 'magic token';

  beforeEach(() => {
    postJSON.mockClear();
  });

  describe('Loader implementation', () => {
    const BASE_URL = `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}`;
    postJSON.mockResolvedValue(mockFirstTimeResponse);
    it('should call the API url with username and password', done => {
      expect.assertions(1);

      FirstTimeLoaderImpl(
        {
          chosenQuestion,
          answer,
          oldPassword,
          newPassword,
        },
        token,
      ).then(data => {
        expect(postJSON).toBeCalledWith(
          `${BASE_URL}/setPasswordAndSecurityQuestion`,
          {
            chosenQuestion,
            answer,
            oldPassword,
            newPassword,
          },
          { Authorization: `Bearer ${token}` },
        );
        done();
      });
    });
  });

  describe('Service implementation', () => {
    it('Should apply a transform to the service response', done => {
      expect.assertions(1);

      FirstTimeService(postJSON, responseTransform)({
        chosenQuestion,
        answer,
        oldPassword,
        newPassword,
      }).then(result => {
        expect(result).toEqual(responseTransform(mockFirstTimeResponse));
        done();
      });
    });
  });
});
