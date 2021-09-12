import { shallow } from 'enzyme';
import * as React from 'react';

import { Warnings } from './warnings.component';

const warningProps = {
  selectedSegment: 'Trend Graph',
  selectSegment: () => null,
};

describe('Warnings component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<Warnings {...warningProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
