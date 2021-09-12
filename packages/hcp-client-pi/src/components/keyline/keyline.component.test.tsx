import { shallow } from 'enzyme';
import * as React from 'react';

import { Keyline } from './keyline.component';

describe('Keyline component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Keyline color="#A1A1A1" />);
    expect(wrapper).toMatchSnapshot();
  });
});
