import {
  cleanupMockEndpoints,
  mockGetLastDeliveryStatus,
} from 'src/test/mock-endpoints';

import {
  GetLastDeliveryStatusLoaderImpl,
  GetLastDeliveryStatusServiceImpl,
  GetLastDeliveryStatusTransformImpl,
} from './get-last-delivery-status.service';
import { mockGetLastDeliveryStatusResponse } from './get-last-delivery-status.mock';

describe('Get delivery status service', () => {
  beforeEach(() => {
    mockGetLastDeliveryStatus({
      status: 200,
      body: { ...mockGetLastDeliveryStatusResponse },
      patientId: 1,
    });
  });

  afterEach(() => {
    cleanupMockEndpoints();
  });

  it('should call the get delivery status endpoint and transform response', async () => {
    const data = await GetLastDeliveryStatusServiceImpl(
      GetLastDeliveryStatusLoaderImpl,
      GetLastDeliveryStatusTransformImpl,
    )(
      {
        ...mockGetLastDeliveryStatusResponse,
        patientId: 1,
      },
      123,
    );

    expect(data).toEqual(
      GetLastDeliveryStatusTransformImpl(mockGetLastDeliveryStatusResponse),
    );
  });
});
