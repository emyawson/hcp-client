import * as enzyme from 'enzyme';
import * as React from 'react';

import { CreatePatient } from './create-patient.component';

describe('Create patient component test suite', () => {
  it('Should render without crashing', () => {
    const tree = enzyme.shallow(
      <CreatePatient
        onCreatePatient={() => true}
        onStep={() => 0}
        getDepartmentProfileTypes={() => null}
        getCountries={() => null}
      />,
    );
    expect(tree).toHaveLength(1);
  });
});
