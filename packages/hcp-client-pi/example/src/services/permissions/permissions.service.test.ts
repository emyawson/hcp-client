import { cleanupMockEndpoints, mockPermissionsEndpoint } from 'src/test';

import { permissionsService } from './permissions.service';

describe('permissions service test', () => {
  beforeAll(() => {
    mockPermissionsEndpoint({ status: 200, body: { permissions: [] } });
  });
  afterAll(() => {
    cleanupMockEndpoints();
  });
  it('should bootstrap a service that calls the permissions endpoint', async () => {
    const data = await permissionsService({ patientId: '1', token: '123' });
    expect(data).toEqual({ permissions: [] });
  });
});
