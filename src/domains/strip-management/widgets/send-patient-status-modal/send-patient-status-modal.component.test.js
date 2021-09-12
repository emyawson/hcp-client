import React from 'react';
import { shallow } from 'enzyme';

import { TRAFFIC_LIGHT_STATES } from 'src/core';

import { SendPatientStatusModal } from './send-patient-status-modal.component';

describe('Send patient status modal component', () => {
  it('Renders properly', () => {
    const mockProps = {
      data: {
        trafficLightStatusConditions: {},
        trafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER,
      },
      destroyModal: () => {},
    };
    const wrapper = shallow(<SendPatientStatusModal {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
