import React from 'react';
import { shallow } from 'enzyme';

import { AccordionItem } from './accordion-item.component';

describe('Accordion Item tests', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AccordionItem />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with label', () => {
    const wrapper = shallow(
      <AccordionItem labelled label="test" title="Test" />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
