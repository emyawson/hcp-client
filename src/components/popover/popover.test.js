import { shallow } from 'enzyme';
import React from 'react';

import { Popover } from 'src/components';

describe('popover test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <Popover pushLeft={10} show width={50}>
        <div>test</div>
      </Popover>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
