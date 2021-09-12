import React from 'react';
import { shallow } from 'enzyme';

import { CardPopover } from './card-popover.component';

describe('CardPopover', () => {
  const defaultProps = {
    show: true,
    popoverTitleKey: 'dashboard.patientCardPopover.header',
    popoverActions: [
      { textKey: 'dashboard.patientCardPopover.timePeriods', url: '/' },
    ],
  };

  it('renders correctly', () => {
    const wrapper = shallow(<CardPopover {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
