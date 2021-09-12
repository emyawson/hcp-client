import React from 'react';
import { shallow } from 'enzyme';

import { LocalForm } from './local-form.component';

describe('Local Form Wrapper', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<LocalForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
