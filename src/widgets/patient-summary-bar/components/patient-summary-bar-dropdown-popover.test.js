import React from 'react';
import { shallow } from 'enzyme';

import { PatientSummaryBarDropdownPopover } from './patient-summary-bar-dropdown-popover.component';

describe('Patient Summary Bar Dropdown Popover - Tests', () => {
  const mockProps = {
    dropdownContent: 'Test Dropdown Content',
    headerText: 'Test Header',
    show: true,
    width: 17,
    pushLeft: 15,
  };

  test('it renders correctly', () => {
    const wrapper = shallow(
      <PatientSummaryBarDropdownPopover {...mockProps} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
