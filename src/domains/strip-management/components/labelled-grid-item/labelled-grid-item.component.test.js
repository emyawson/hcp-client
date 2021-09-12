import React from 'react';
import { shallow } from 'enzyme';

import { LabelledGridItem } from './labelled-grid-item.component';

describe('Labelled grid item component', () => {
  const mockBaseProps = {
    label: 'label',
    highlighted: false,
    isRowTitle: false,
  };
  it('Renders correctly', () => {
    const mockProps = { ...mockBaseProps, value: '12' };
    const wrapper = shallow(<LabelledGridItem {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Renders with default props', () => {
    const wrapper = shallow(<LabelledGridItem {...mockBaseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
