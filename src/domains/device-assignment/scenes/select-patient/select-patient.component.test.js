import * as enzyme from 'enzyme';
import * as React from 'react';

import { SelectPatientComponent } from './select-patient.component';

describe('select patient on device assignment test suite', () => {
  const mockProps = {
    onSearch: () => null,
    onCreatePatient: () => null,
    deviceInfo: {},
    searchResults: [],
  };

  it('should render without crashing', () => {
    const tree = enzyme.shallow(<SelectPatientComponent {...mockProps} />);
    expect(tree).toHaveLength(1);
  });
});
