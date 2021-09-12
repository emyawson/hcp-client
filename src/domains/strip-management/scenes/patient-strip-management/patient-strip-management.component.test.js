import React from 'react';
import { shallow } from 'enzyme';

import { PatientStripManagementComp } from './patient-strip-management.component';

describe('Patient Strip Management component', () => {
  it('renders correctly', () => {
    const props = {
      match: {
        params: {
          id: 22,
        },
      },
      patient: {
        name: 'Patient Test',
      },
    };
    const component = shallow(<PatientStripManagementComp {...props} />);
    expect(component).toMatchSnapshot();
  });
});
