import { shallow } from 'enzyme';
import React from 'react';

import { ToolTip } from './tool-tip.component';

describe('Tooltip component test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <ToolTip x={0} y={0}>
        <div>Content</div>
      </ToolTip>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
