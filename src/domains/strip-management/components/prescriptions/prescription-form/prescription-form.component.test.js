import React from 'react';
import { shallow } from 'enzyme';

import { PrescriptionForm } from './prescription-form.component';

describe('Prescription form component', () => {
  it('Renders correctly', () => {
    const mockProps = {
      id: 'a1',
      attachDispatch: () => {},
      handleSubmit: () => {},
      frequency: { a1: 'twoWeeks' },
      therapy: { a1: '1' },
      clinicGuide: { a1: '1' },
      quantity: { a1: 6 },
      period: { a1: 'days' },
      stripModel: { a1: '1' },
      reason: { a1: 'Pregnancy' },
      startDate: { a1: '2018-02-27T00:00:00.000Z' },
      endDate: { a1: '2018-02-27T00:00:00.000Z' },
      therapies: { a1: [] },
      clinicGuides: { a1: [] },
      quantities: { a1: [] },
      periods: { a1: [] },
      frequencies: { a1: [] },
      hasCustomClinicGuide: { a1: true },
      clinicGuideFilter: { a1: 'PRESET' },
    };
    const wrapper = shallow(<PrescriptionForm {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
