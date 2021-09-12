import React from 'react';
import { shallow } from 'enzyme';

import { TotalStockCard } from './total-stock-card.component';

describe('Total stock card component', () => {
  it('Renders correctly', () => {
    const mockProps = {
      aggregateStock: {
        stripStock: 100,
        tubeStock: 5000,
        lastShipmentDate: '2018-02-27T00:00:00.000Z',
      },
    };
    const wrapper = shallow(<TotalStockCard {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
