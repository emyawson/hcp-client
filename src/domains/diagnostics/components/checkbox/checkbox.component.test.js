import { shallow } from 'enzyme';
import React from 'react';

import { Checkbox } from 'src/domains/diagnostics/components';

describe('checkbox test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<Checkbox size={100} id="test" label="test" />);
    expect(wrapper).toMatchSnapshot();
  });
  test('it renders correctly with label before checkbox', () => {
    const wrapper = shallow(
      <Checkbox size={100} id="test" label="test" labelBeforeCheckbox />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('it renders correctly with RRF controls', () => {
    const wrapper = shallow(<Checkbox modelPath="test" />);
    expect(wrapper).toMatchSnapshot();
  });
});
