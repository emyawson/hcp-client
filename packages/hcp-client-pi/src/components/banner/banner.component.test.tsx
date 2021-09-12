import { shallow } from 'enzyme';
import * as React from 'react';

import { Banner } from './banner.component';

describe('Banner component', () => {
  it('Render correctly', () => {
    const wrapper = shallow(<Banner />);
    expect(wrapper).toMatchSnapshot();
  });
});
