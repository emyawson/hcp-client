import React from 'react';
import { shallow } from 'enzyme';

import { PatientSummaryBarDropdown } from './patient-summary-bar-dropdown.component';

describe('Patient Summary Bar Dropdown - Test Suite', () => {
  it('toggles the state on click action', () => {
    const mockProps = {
      match: {
        path: '/patients/:id',
        url: '/patients/1111',
        params: { id: '111' },
      },
    };
    const wrapper = shallow(<PatientSummaryBarDropdown {...mockProps} />);
    wrapper.instance().toggleShowPopover();
    expect(wrapper.state().showPopover).toBeTruthy();
  });
});
