import * as nock from 'nock';

import { Config } from 'src/core';
import { cleanupMockEndpoints } from 'src/test';

import {
  GetDeviceAssociationLoaderImpl,
  GetDeviceAssociationTransformImpl,
  GetDeviceAssociationServiceFactoryImpl,
} from './get-device-association.service';
import { mockDeviceAssociation } from './get-device-association.mock';

const { REACT_APP_EC6_API_ROOT } = Config;

describe('Get device association service', () => {
  const associationId = '3a79c1c6-8814-4a76-976a-b61f45db4e30';
  const token = 'magic token';
  const responseTransform = GetDeviceAssociationTransformImpl;

  afterAll(() => {
    cleanupMockEndpoints();
  });

  describe('JSON Loader', () => {
    const url = `/${associationId}/device`;

    nock(
      `${REACT_APP_EC6_API_ROOT ||
        'http://localhost:3000'}/Associations/${associationId}/device`,
    )
      .persist()
      .get('')
      .reply(200, mockDeviceAssociation);

    it('should call api to fetch device association info by Id', done => {
      GetDeviceAssociationLoaderImpl({ associationId }, token).then(data => {
        expect(data).toEqual({
          associationId: '3a79c1c6-8814-4a76-976a-b61f45db4e30',
          model: {
            brandName: 'ACCU-CHEK',
            description: 'Nuevo modelo prueba',
            formatName: 'UNIT',
            modelDevice: 'NuevoModeloPrueba',
            reference: '1925',
            serialNumber: '925010078480',
          },
          resultDescription: 'getDeviceByAssociationId',
        });
        done();
      });
    });
  });

  describe('Response Transform', () => {
    it('should present server data ready for the client to display', () => {
      const transformed = responseTransform(mockDeviceAssociation);
      expect(transformed.deviceInfo.brandName).toEqual('ACCU-CHEK');
    });
  });

  describe('Service Implementation', () => {
    it('should apply a transform to the service response', done => {
      nock(`${REACT_APP_EC6_API_ROOT}/Associations/${associationId}/device`)
        .persist()
        .get('')
        .reply(200, mockDeviceAssociation);

      GetDeviceAssociationServiceFactoryImpl(
        GetDeviceAssociationLoaderImpl,
        responseTransform,
      )({ associationId }, token).then(result => {
        expect(result).toEqual(responseTransform(mockDeviceAssociation));
        done();
      });
    });
  });
});
