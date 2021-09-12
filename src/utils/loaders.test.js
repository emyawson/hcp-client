import {
  addMockEndpointDomain,
  cleanupMockEndpoints,
  mockCurrentPrescription,
  mockEndpointUrls,
  mockSaveAlerts,
  mockSavePrescription,
  mockSignOut,
} from 'src/test';

import { deleteJSON, getJSON, postJSON, putJSON } from './loaders';

describe('Request Loaders tests', () => {
  const mockResponse = (status, responseStatus) => {
    const response = {
      ok: responseStatus,
    };
    mockCurrentPrescription({
      status: status,
      body: response,
    });
    mockSavePrescription({
      status: status,
      body: response,
    });
    mockSaveAlerts({
      status: status,
      body: response,
      patientId: 21,
    });
    mockSignOut({
      status: status,
      body: response,
    });
  };

  describe('Success', () => {
    beforeAll(() => {
      mockResponse(200, true);
    });
    afterAll(() => {
      cleanupMockEndpoints();
    });
    it('should fetch and return POST data', async () => {
      const mockPost = await postJSON(mockEndpointUrls.savePrescription);
      expect(mockPost).toEqual({ ok: true });
    });
    it('should fetch and return GET JSON data', async () => {
      const mockGet = await getJSON(mockEndpointUrls.currentPrescription);
      expect(mockGet).toEqual({ ok: true });
    });
    it('should fetch and return DELETE JSON data', async () => {
      const mockDelete = await deleteJSON(mockEndpointUrls.authenticate);
      expect(mockDelete).toEqual({ ok: true });
    });
    it('should fetch and return PUT JSON data', async () => {
      const mockPut = await putJSON(mockEndpointUrls.saveAlerts(21));
      expect(mockPut).toEqual({ ok: true });
    });
  });
  describe('Failure', () => {
    beforeAll(() => {
      mockResponse(500, false);
    });
    afterAll(() => {
      cleanupMockEndpoints();
    });
    it('should fetch and return POST error data', async () => {
      await expect(postJSON(mockEndpointUrls.savePrescription)).rejects.toEqual(
        {
          status: 500,
          statusText: 'Internal Server Error',
          url: addMockEndpointDomain(mockEndpointUrls.savePrescription),
        },
      );
    });
    it('should fetch and return GET JSON error data', async () => {
      await expect(
        getJSON(mockEndpointUrls.currentPrescription),
      ).rejects.toEqual({
        status: 500,
        statusText: 'Internal Server Error',
        url: addMockEndpointDomain(mockEndpointUrls.currentPrescription),
      });
    });
    it('should fetch and return DELETE JSON error data', async () => {
      await expect(deleteJSON(mockEndpointUrls.authenticate)).rejects.toEqual({
        status: 500,
        statusText: 'Internal Server Error',
        url: addMockEndpointDomain(mockEndpointUrls.authenticate),
      });
    });
    it('should fetch and return PUT JSON error data', async () => {
      await expect(putJSON(mockEndpointUrls.saveAlerts(21))).rejects.toEqual({
        status: 500,
        statusText: 'Internal Server Error',
        url: addMockEndpointDomain(mockEndpointUrls.saveAlerts(21)),
      });
    });
  });
});
