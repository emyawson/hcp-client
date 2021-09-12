import { selectPatients, selectIsFetching } from './patients.selector';

describe('Patients selector', () => {
  const mockedState = {
    patientList: { patients: [{}, {}], isFetchingPatients: false },
  };

  it('should select patients', () => {
    expect(selectPatients(mockedState)).toEqual([{}, {}]);
  });

  it('should select isFetchingPatients', () => {
    expect(selectIsFetching(mockedState)).toEqual(false);
  });
});
