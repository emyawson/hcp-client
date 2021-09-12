import { shallow } from 'enzyme';
import * as React from 'react';

import { HorizontalAxis } from './graph-horizontal-axis.component';

describe('HorizontalAxis component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <HorizontalAxis x={0} y={0} width={100} ticks={[]} Tick={() => null} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
