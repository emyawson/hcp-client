import React from 'react';
import { shallow } from 'enzyme';

import { OrgStock } from './org-stock.component';

const mockProps = {
  stripsHistory: [],
};

describe('org stock component', () => {
  it('renders correctly', () => {
    const component = shallow(<OrgStock {...mockProps} />);
    expect(component).toMatchSnapshot();
  });
});
