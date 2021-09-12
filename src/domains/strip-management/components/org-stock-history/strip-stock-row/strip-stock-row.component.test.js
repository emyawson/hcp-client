import React from 'react';
import { shallow } from 'enzyme';

import { StripStockRow } from './strip-stock-row.component';

describe('Strip stock row component', () => {
  const mockProps = {
    dateAdded: '2018-02-27T00:00:00.000Z',
    id: '123',
    name: 'Name',
    tubeStock: 100,
    unitStock: 5000,
    totalTubeStock: 1000,
    totalStripStock: 50000,
  };
  it('Renders correctly', () => {
    const wrapper = shallow(<StripStockRow {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
