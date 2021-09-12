import React from 'react';
import { shallow } from 'enzyme';

import { ProgressBar } from './progress-bar.component';

describe('Progress bar component', () => {
  it('renders correctly', () => {
    const mockProps = {
      fill: 80,
      color: '#CF021B',
    };
    const wrapper = shallow(<ProgressBar {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders default fill as 0', () => {
    const wrapper = shallow(<ProgressBar color="#CF021B" />);
    expect(wrapper).toMatchSnapshot();
  });
});
