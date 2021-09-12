import * as React from 'react';
import { shallow } from 'enzyme';

import { PatientSummaryBarContainer } from 'src/widgets/patient-summary-bar';

import { withPatientSummary } from './with-patient-summary';

describe('With Patient Summary HoC', () => {
  const Component = () => <span />;
  const mockProps = {
    disabled: false,
    isActive: true,
    title: 'This is a component title',
  };
  const ComponentWithWrapper = withPatientSummary(Component);
  it('should add the Patient Summary bar around passed content', () => {
    const wrapper = shallow(<ComponentWithWrapper {...mockProps} />);
    expect(wrapper.find(PatientSummaryBarContainer).length).toBe(1);
    expect(wrapper.find(Component).length).toBe(1);
  });
  it('should render the wrapped component with all desired props', () => {
    const wrapper = shallow(<ComponentWithWrapper {...mockProps} />);
    const wrappedComponent = wrapper.find(Component);
    expect(wrappedComponent.length).toBe(1);
    expect(wrappedComponent.props()).toEqual(
      expect.objectContaining(mockProps),
    );
  });
});
