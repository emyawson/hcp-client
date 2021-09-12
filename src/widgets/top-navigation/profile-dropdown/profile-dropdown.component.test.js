import { shallow } from 'enzyme';
import React from 'react';

import { ProfileDropdown } from './profile-dropdown.component';

describe('profile-dropdown test suite', () => {
  const mockProps = {
    onSignOut: () => {},
    fullName: 'Test User',
  };

  test('it renders correctly', () => {
    const wrapper = shallow(<ProfileDropdown {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('toggles the modal display on click action', () => {
    const wrapper = shallow(<ProfileDropdown {...mockProps} />);
    wrapper.instance().toggleModalDisplay();
    expect(wrapper.state().showPopover).toBeTruthy();
  });
});
