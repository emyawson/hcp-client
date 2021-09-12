import React from 'react';
import { shallow } from 'enzyme';

import { CustomClinicGuideSummary } from './custom-clinic-guide-summary.component';

describe('Custom clinic guide summary component', () => {
  it('Renders correctly', () => {
    const mockProps = {
      name: 'guide 1',
      date: 'June 20 2018',
      ownerName: 'Brandy Newton',
    };
    const wrapper = shallow(<CustomClinicGuideSummary {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
