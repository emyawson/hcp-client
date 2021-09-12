import { shallow } from 'enzyme';
import React from 'react';

import { TopNavigation } from './top-navigation.component';

describe('top-navigation test suite', () => {
  test('it renders correctly', () => {
    const session = {
      user: {
        fullname: 'Jimmy Marlon Professional',
      },
    };
    const wrapper = shallow(<TopNavigation session={session} />);
    expect(wrapper).toMatchSnapshot();
  });
});
