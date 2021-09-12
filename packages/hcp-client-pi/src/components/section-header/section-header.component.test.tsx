import { shallow } from 'enzyme';
import * as React from 'react';

import { SectionHeader } from './section-header.component';

describe('Section header component', () => {
  it('Renders correctly', () => {
    const mockProps = {
      title: 'Section title',
      textColor: '#0D79D6',
      bottomMargin: '0.5rem',
      bottomMarginHeadline: '1rem',
      borderColor: '#0D79D6',
    };
    const wrapper = shallow(<SectionHeader {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
