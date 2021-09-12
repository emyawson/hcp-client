import React from 'react';
import { shallow } from 'enzyme';

import { PatientDashboard } from './patient-dashboard.component';

describe('patient dashboard component', () => {
  it('renders correctly', () => {
    const props = {
      permissions: {
        hasUserShowGraphicConfiguration: true,
        hasTreatmentList: true,
        hasPatientDeactivation: true,
        hasTimeBlocksManagement: true,
      },
      graph: 'standard-week',
      graphType: 'details',
      getPatient: () => {},
      getPatientStock: () => {},
      getClinicalData: () => {},
      getTimeIntervals: () => {},
      patient: {
        id: '123',
        name: {
          first: 'Bob',
          last: 'Smith',
        },
        diabetesType: 1,
        birthdate: 19900101,
        phone: 212111111,
      },
      getDeliveryRequest: () => {},
      getThresholds: () => {},
      match: {
        url: '/patients/123',
        params: {
          id: 22,
        },
      },
    };
    // $FlowIgnore
    const component = shallow(<PatientDashboard {...props} />);
    expect(component).toMatchSnapshot();
  });
});
