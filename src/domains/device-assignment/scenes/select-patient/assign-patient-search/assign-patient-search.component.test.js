import * as enzyme from 'enzyme';
import * as React from 'react';

import { AssignPatientSearch } from './assign-patient-search.component';

describe('search patient on device assignment test suite', () => {
  const mockProps = {
    onSearch: () => null,
    onCreatePatient: () => null,
  };

  it('should render without crashing', () => {
    const tree = enzyme.shallow(<AssignPatientSearch {...mockProps} />);
    expect(tree).toHaveLength(1);
  });
});
