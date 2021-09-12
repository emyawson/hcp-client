import { patientStockResponseTransform } from './patient-stock.epics';
import { GET_PATIENT_STOCK_REQUEST } from './patient-stock.constants';

describe('Patient stock epic response transform', () => {
  it('should transform and return data correctly', () => {
    expect(
      patientStockResponseTransform(
        { stock: 200 },
        {
          type: GET_PATIENT_STOCK_REQUEST.START,
          payload: { stripModelId: 1 },
        },
      ),
    ).toEqual({
      patientStock: 200,
      stripModelId: 1,
    });
  });
});
