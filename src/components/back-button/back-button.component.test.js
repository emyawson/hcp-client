import React from 'react';
import { shallow } from 'enzyme';

import { BackButton } from './back-button.component';

describe('Back button component', () => {
  it('renders properly', () => {
    const props = {
      to: '/prescription',
    };
    const wrapper = shallow(<BackButton {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
