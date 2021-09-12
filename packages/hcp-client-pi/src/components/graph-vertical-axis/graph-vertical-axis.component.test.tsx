import { shallow } from 'enzyme';
import * as React from 'react';

import { VerticalAxis } from './graph-vertical-axis.component';

describe('VerticalAxis component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <VerticalAxis x={0} y={0} height={100} ticks={[]} Tick={() => null} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
