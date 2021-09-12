import React from 'react';
import { shallow } from 'enzyme';

import { NumberInputOperator } from './number-input-operator.component';

describe('Number input operator component', () => {
  it('renders correctly', () => {
    const mockProps = {
      icon: () => <span>icon</span>,
      operatorAction: () => {},
      position: 'top',
      disabled: false,
    };
    const wrapper = shallow(<NumberInputOperator {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
