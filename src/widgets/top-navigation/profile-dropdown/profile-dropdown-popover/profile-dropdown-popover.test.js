import { shallow } from 'enzyme';
import React from 'react';

import { ProfileDropdownPopover } from './profile-dropdown-popover.component';

describe('profile-dropdown-popover test suite', () => {
  const mockProps = {
    show: true,
    pushLeft: 50,
    width: 50,
    onSignOut: () => void 0,
  };
  test('it renders correctly', () => {
    const wrapper = shallow(
      <ProfileDropdownPopover {...mockProps}>
        <div>test</div>
      </ProfileDropdownPopover>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
