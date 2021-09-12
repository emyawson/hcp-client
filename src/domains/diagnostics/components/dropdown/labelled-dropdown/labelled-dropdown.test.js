import { shallow } from 'enzyme';
import React from 'react';

import { LabelledDropdown } from './labelled-dropdown.component';

describe('labelled dropdown test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <LabelledDropdown
        label="Drop down"
        labelIsInline
        modelPath=".dropdown"
        options={[
          { label: 'Uno', value: 1 },
          { label: 'Dos', value: 2 },
          { label: 'Tres', value: 3 },
        ]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
