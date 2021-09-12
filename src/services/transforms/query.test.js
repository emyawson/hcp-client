import { withQueryPatientId } from './query.js';

describe('Service Query Transform Test Suite', () => {
  const response = {
    id: 'abc-123',
    diabetesType: 'DIABETES_TYPE_1',
  };
  it("should append the query's patient ID to server response", () => {
    const query = {
      patientId: 1,
    };
    expect(withQueryPatientId(query)(response)).toEqual({
      id: 'abc-123',
      diabetesType: 'DIABETES_TYPE_1',
      patientId: 1,
    });
  });
  it('should transform without failing if patientId is not set', () => {
    const query = {
      search: 'Test Patient',
    };
    expect(withQueryPatientId(query)(response)).toEqual({
      id: 'abc-123',
      diabetesType: 'DIABETES_TYPE_1',
      patientId: null,
    });
  });
});
