import React from 'react';
import { shallow } from 'enzyme';

import { CustomClinicGuidesForm } from './custom-clinic-guides-form.component';

describe('Custom clinic guides form component', () => {
  it('renders correctly', () => {
    const props = {
      attachDispatch: () => {},
      periods: [{ label: 'Test Period', id: '1234' }],
      therapies: [{ label: 'Test Therapy', id: '1234' }],
      onQuantitySliderChange: () => {},
      onSubmitSaveClinicGuide: () => {},
    };
    const component = shallow(<CustomClinicGuidesForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
