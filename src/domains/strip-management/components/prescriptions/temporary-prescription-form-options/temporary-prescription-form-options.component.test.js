import React from 'react';
import { shallow } from 'enzyme';

import { TemporaryPrescriptionFormOptions } from './temporary-prescription-form-options.component';

describe('Temporary prescription from component', () => {
  it('Renders correctly', () => {
    const mockProps = {
      id: 'a1',
      reasons: { a1: [] },
      onDatesChange: () => {},
      placeholderText: 'Select',
    };
    const wrapper = shallow(
      <TemporaryPrescriptionFormOptions {...mockProps} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
