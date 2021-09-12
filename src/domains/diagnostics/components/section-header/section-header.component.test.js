import React from 'react';
import { shallow } from 'enzyme';

import { SectionHeader } from './section-header.component';

describe('Section header component', () => {
  it('Renders correctly', () => {
    const mockProps = {
      title: 'Section title',
      textColor: '#0D79D6',
      bottomMargin: '0.5rem',
      bottomMarginHeadline: '1rem',
    };
    const wrapper = shallow(<SectionHeader {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
