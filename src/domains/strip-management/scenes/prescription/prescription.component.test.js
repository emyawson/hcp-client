import React from 'react';
import { shallow } from 'enzyme';

import { Prescription } from './prescription.component';

describe('prescription component', () => {
  it('renders correctly', () => {
    const props = {
      getCurrentPrescriptionRequest: () => {},
      getFrequenciesRequest: () => {},
      prescriptions: { permanent: { id: 1 }, temporary: [] },
    };
    const component = shallow(<Prescription {...props} />);
    expect(component).toMatchSnapshot();
  });
});
