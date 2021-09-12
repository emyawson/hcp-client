import React from 'react';
import { shallow } from 'enzyme';

import { OrgStripManagement } from './org-strip-management.component';

describe('Organization Strip Management component', () => {
  it('renders correctly', () => {
    const props = {
      match: {
        params: {
          id: 22,
        },
      },
    };
    const component = shallow(<OrgStripManagement {...props} />);
    expect(component).toMatchSnapshot();
  });
});
