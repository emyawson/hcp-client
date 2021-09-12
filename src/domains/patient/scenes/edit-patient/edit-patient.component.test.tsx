import * as enzyme from 'enzyme';
import * as React from 'react';

import { EditPatientComponent } from './edit-patient.component';

describe('Create patient component test suite', () => {
  it('Should render without crashing', () => {
    const tree = enzyme.shallow(<EditPatientComponent />);
    expect(tree).toHaveLength(1);
  });
});
