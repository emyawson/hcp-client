import * as nock from 'nock';

import { Config } from '../../../core';

import {
  UpdateDeviceAssociationLoaderImpl,
  UpdateDeviceAssociationTransformImpl,
  UpdateDeviceAssociationServiceFactoryImpl,
} from './update-device-association.service';
import { mockUpdateDeviceAssociationEC6Response } from './update-device-association.mock';

import { cleanupMockEndpoints } from '../../../test';

const { REACT_APP_EC6_API_ROOT } = Config;

describe('Create device and patient association Service Test Suite', () => {
  const patientId = 111;
  const associationId = '<dummy_association_id>';
  const token = 'magic token';

  afterAll(() => {
    cleanupMockEndpoints();
  });

  describe('JSON Loader', () => {
    nock(
      `${REACT_APP_EC6_API_ROOT ||
        'http://localhost:3000'}/Patients/${patientId}/Associations/${associationId}`,
    )
      .persist()
      .get('')
      .reply(200, mockUpdateDeviceAssociationEC6Response);

    it('should call api to fetch device association info by Id', done => {
      UpdateDeviceAssociationLoaderImpl(
        { patientId, associationId },
        token,
      ).then(data => {
        expect(data).toEqual({
          resultDescription: 'assingDeviceToPatientOk',
          model: 'SUCCESS',
        });
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should present server data ready for the client to display', () => {
      const transformed = UpdateDeviceAssociationTransformImpl(
        mockUpdateDeviceAssociationEC6Response,
      );
      expect(transformed.success).toEqual(true);
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      nock(
        `${REACT_APP_EC6_API_ROOT ||
          'http://localhost:3000'}/Patients/${patientId}/Associations/${associationId}`,
      )
        .persist()
        .get('')
        .reply(200, mockUpdateDeviceAssociationEC6Response);

      UpdateDeviceAssociationServiceFactoryImpl(
        UpdateDeviceAssociationLoaderImpl,
        UpdateDeviceAssociationTransformImpl,
      )({ patientId, associationId }, token).then(result => {
        expect(result).toEqual(
          UpdateDeviceAssociationTransformImpl(
            mockUpdateDeviceAssociationEC6Response,
          ),
        );
        done();
      });
    });
  });
});
