import { shallow } from 'enzyme';
import * as React from 'react';

import { Card } from './card.component';

describe('Section header component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper).toMatchSnapshot();
  });
});
