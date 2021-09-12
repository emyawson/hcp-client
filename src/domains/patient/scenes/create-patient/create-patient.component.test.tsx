import * as enzyme from 'enzyme';
import * as React from 'react';

import { CreatePatientComponent } from './create-patient.component';

describe('Create patient component test suite', () => {
  it('Should render without crashing', () => {
    const tree = enzyme.shallow(<CreatePatientComponent />);
    expect(tree).toHaveLength(1);
  });
});
