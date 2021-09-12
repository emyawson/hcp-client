import {
  cleanupMockEndpoints,
  mockGetClinicalData,
} from 'src/test/mock-endpoints';

import {
  ClinicalDataLoaderImpl,
  ClinicalDataTransformImpl,
  ClinicalDataServiceImpl,
} from './clinical-data.service';
import { mockClinicalData } from './clinical-data.mock';

describe('Clinical data service', () => {
  beforeEach(() => {
    mockGetClinicalData({
      status: 200,
      body: { ...mockClinicalData },
      patientId: 1,
      startDate: '2016-02-28T00:00:00.000Z',
      endDate: '2016-02-28T00:00:00.000Z',
    });
  });

  afterEach(() => {
    cleanupMockEndpoints();
  });

  it('should call the clinical data endpoint and transform response', async () => {
    const data = await ClinicalDataServiceImpl(
      ClinicalDataLoaderImpl,
      ClinicalDataTransformImpl,
    )(
      {
        patientId: 1,
        startDate: '2016-02-28T00:00:00.000Z',
        endDate: '2016-02-28T00:00:00.000Z',
      },
      123,
    );

    expect(data).toEqual(ClinicalDataTransformImpl({ ...mockClinicalData }));
  });
});
