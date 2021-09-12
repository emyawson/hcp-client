import React from 'react';
import { shallow } from 'enzyme';

import { AddOrgStock } from './add-org-stock.component';

describe('AddOrgStock component', () => {
  const mockProps = {
    stripModels: {},
    onUpdateNumberOfTubes: () => null,
    attachDispatch: () => null,
    handleSubmit: () => null,
  };
  it('renders correctly', () => {
    const wrapper = shallow(<AddOrgStock {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
