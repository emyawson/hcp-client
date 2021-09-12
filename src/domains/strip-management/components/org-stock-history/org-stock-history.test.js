import React from 'react';
import { shallow } from 'enzyme';

import { OrgStockHistory } from './org-stock-history.component';

describe('Organization Stock History component', () => {
  const mockProps = {
    stripModelStockAndHistory: [],
  };
  it('renders correctly', () => {
    const wrapper = shallow(<OrgStockHistory {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
