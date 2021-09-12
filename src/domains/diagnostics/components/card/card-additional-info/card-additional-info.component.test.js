import React from 'react';
import { shallow } from 'enzyme';

import { CardAdditionalInfo } from './card-additional-info.component';

describe('CardAdditionalInfo', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <CardAdditionalInfo>
        <span>Find Out More</span>
      </CardAdditionalInfo>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
