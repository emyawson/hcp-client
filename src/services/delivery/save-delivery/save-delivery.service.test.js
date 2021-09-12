import {
  cleanupMockEndpoints,
  mockSaveDelivery,
} from 'src/test/mock-endpoints';

import {
  SaveDeliveryLoaderImpl,
  SaveDeliveryServiceImpl,
  SaveDeliveryTransformImpl,
} from './save-delivery.service';
import { mockSaveDeliveryResponse } from './save-delivery.mock';

describe('Save delivery service', () => {
  beforeEach(() => {
    mockSaveDelivery({
      status: 200,
      body: { ...mockSaveDeliveryResponse },
      patientId: 1,
    });
  });

  afterEach(() => {
    cleanupMockEndpoints();
  });

  it('should call the save delivery endpoint and transform response', async () => {
    const data = await SaveDeliveryServiceImpl(
      SaveDeliveryLoaderImpl,
      SaveDeliveryTransformImpl,
    )(
      {
        ...mockSaveDeliveryResponse,
        patientId: 1,
      },
      123,
    );

    expect(data).toEqual(
      SaveDeliveryTransformImpl({
        ...mockSaveDeliveryResponse,
        patientId: 1,
      }),
    );
  });
});
