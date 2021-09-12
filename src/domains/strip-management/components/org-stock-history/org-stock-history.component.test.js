import React from 'react';
import { shallow } from 'enzyme';

import { OrgStockHistory } from './org-stock-history.component';

describe('Org stock history component', () => {
  it('Renders correctly', () => {
    const mockProps = {
      stripModelStockAndHistory: [
        {
          id: '123',
          name: 'AccuChek Aviva',
          lastShipmentDate: '2018-02-27T00:00:00.000Z',
          lastShipmentNumberOfStripsReceived: 1000,
          lastShipmentNumberOfTubesReceived: 20,
          currentStripStock: 12000,
          currentTubeStock: 240,
        },
      ],
    };
    const wrapper = shallow(<OrgStockHistory {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
