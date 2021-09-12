import React from 'react';
import { shallow } from 'enzyme';

import { Form } from './form.component';

describe('Form Wrapper', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper).toMatchSnapshot();
  });
});
