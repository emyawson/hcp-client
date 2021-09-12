import * as nock from 'nock';

import { Config } from '../../core';
import { cleanupMockEndpoints } from '../../test';

import {
  GetLatestPatientsLoaderImpl,
  GetLatestPatientsTransformImpl,
  GetLatestPatientsServiceFactoryImpl,
} from './get-latest-patients.service';
import { mockGetLatestPatients } from './get-latest-patients.mock';

const { REACT_APP_EC6_API_ROOT } = Config;

describe('Get latest patients service', () => {
  const token = '__dummy_token__';
  const professionalId = 54654;
  const responseTransform = GetLatestPatientsTransformImpl;
  const url = `/Practitioners/${professionalId}/Patients/latest`;

  afterAll(() => {
    cleanupMockEndpoints();
  });

  describe('JSON Loader', () => {
    nock(`${REACT_APP_EC6_API_ROOT || 'http://localhost:3000'}${url}`)
      .persist()
      .get('')
      .reply(200, mockGetLatestPatients);

    it('should call api to fetch latest created patients', done => {
      GetLatestPatientsLoaderImpl({ professionalId }, token).then(data => {
        expect(data).toEqual(mockGetLatestPatients);
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should present server data ready for the client to display', () => {
      const transformed = responseTransform(mockGetLatestPatients);
      expect(transformed[0].id).toEqual(57770);
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      nock(`${REACT_APP_EC6_API_ROOT || 'http://localhost:3000'}${url}`)
        .persist()
        .get('')
        .reply(200, mockGetLatestPatients);

      GetLatestPatientsServiceFactoryImpl(
        GetLatestPatientsLoaderImpl,
        responseTransform,
      )({ professionalId }, token).then(result => {
        expect(result).toEqual(responseTransform(mockGetLatestPatients));
        done();
      });
    });
  });
});
