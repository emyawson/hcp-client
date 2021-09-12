import React from 'react';
import { shallow } from 'enzyme';

import { CustomClinicGuides } from './custom-clinic-guides.component';

describe('Custom clinic guides component', () => {
  it('renders correctly', () => {
    const props = {};
    const component = shallow(<CustomClinicGuides {...props} />);
    expect(component).toMatchSnapshot();
  });
});
