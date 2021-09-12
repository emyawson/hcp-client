import React from 'react';
import { shallow } from 'enzyme';

import { IndicatorLabel } from './indicator-label.component';

describe('Indicator label component', () => {
  it('renders correctly', () => {
    const mockProps = {
      active: true,
      error: true,
      text: 'label',
      marginDirection: 'left',
    };
    const wrapper = shallow(<IndicatorLabel {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('sets default props', () => {
    const mockProps = {
      text: 'label',
    };
    const wrapper = shallow(<IndicatorLabel {...mockProps} />);
    expect(wrapper.props().active).toEqual(false);
    expect(wrapper.props().error).toEqual(false);
    expect(wrapper.props().margin).toEqual('');
  });
});
