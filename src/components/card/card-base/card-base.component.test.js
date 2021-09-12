import React from 'react';
import { shallow } from 'enzyme';

import { CardBase } from './card-base.component';

describe('Card base component', () => {
  it('Renders properly', () => {
    const mockProps = {
      cardStyles: ['blue'],
    };
    const wrapper = shallow(
      <CardBase {...mockProps}>
        <h1>title</h1>
      </CardBase>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
