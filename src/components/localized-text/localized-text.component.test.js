import React from 'react';
import { shallow } from 'enzyme';

import { Localized } from './localized-text.component';

describe('Localized component', () => {
  const mockEn = {
    stripDeliveryTitle: val => `Strip Delivery ${val}`,
  };
  const baseProps = {
    t: (textKey, values) =>
      !textKey ? '' : !values ? mockEn[textKey] : mockEn[textKey](values),
    values: 'Models',
  };
  const allProps = {
    ...baseProps,
    textKey: 'stripDeliveryTitle',
  };

  it('renders correctly', () => {
    const wrapper = shallow(<Localized {...allProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with default props', () => {
    const wrapper = shallow(<Localized {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
