import React from 'react';
import { shallow } from 'enzyme';

import { AccordionTitleDiv } from 'src/components/accordion/accordion.style';

import { PrescriptionSummaryCard } from './prescription-summary-card.component';

describe('Prescription summary card component', () => {
  const mockBaseProps = {
    titleKey: 'title',
    patientStock: 100,
    period: 'days',
    quantity: 6,
  };

  it('Renders correctly', () => {
    const wrapper = shallow(<PrescriptionSummaryCard {...mockBaseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Does not render title if card is content-only', () => {
    const mockProps = {
      ...mockBaseProps,
      contentOnly: true,
    };
    const wrapper = shallow(<PrescriptionSummaryCard {...mockProps} />);
    expect(wrapper.find(AccordionTitleDiv)).toHaveLength(0);
  });
});
