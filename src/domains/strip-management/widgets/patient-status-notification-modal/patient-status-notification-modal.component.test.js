import React from 'react';
import { shallow } from 'enzyme';

import { TRAFFIC_LIGHT_STATES } from 'src/core';

import { PatientStatusNotificationModal } from './patient-status-notification-modal.component';

describe('Patient status notification modal component', () => {
  const mockProps = {
    lastTrafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER,
    lastTrafficLightStatusConditions: {},
    lastTrafficLightStatusComment: 'comment',
    lastTrafficLightStatusDateCalculated: '2018-02-27T00:00:00.000Z',
    hasLastTrafficLightStatusWithAlert: false,
    destroyModal: () => {},
  };
  it('Renders properly', () => {
    const wrapper = shallow(<PatientStatusNotificationModal {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
