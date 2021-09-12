import React from 'react';
import { shallow } from 'enzyme';

import { Card } from './card.component';

describe('Card component', () => {
  const defaultProps = {
    title: 'Card',
    expandable: false,
  };

  it('renders child content', () => {
    const childWrapper = shallow(
      <Card {...defaultProps}>
        <p className="childWrapper__paragraph">Test</p>
        <p className="childWrapper__paragraph">Test 2</p>
        <p className="childWrapper__paragraph">Test 3</p>
      </Card>,
    );
    expect(childWrapper).toMatchSnapshot();
  });
});
