import { shallow } from 'enzyme';
import * as React from 'react';

import { GridLines } from './graph-grid-lines.component';

describe('Section header component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <GridLines
        verticalCount={1}
        horizontalCount={1}
        width={100}
        height={100}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
