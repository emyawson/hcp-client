import React from 'react';
import { shallow } from 'enzyme';

import { BasicError, showFieldError } from './basic-error.component';

const mockFieldTouchedProps = {
  touched: true,
  focus: false,
};
const mockFieldActiveProps = {
  touched: true,
  focus: true,
};

describe('Basic Form Error', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BasicError />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should show errors for dirty fields', () => {
    expect(showFieldError(mockFieldTouchedProps)).toBeTruthy();
  });
  it('should suppress errors for focused fields', () => {
    expect(showFieldError(mockFieldActiveProps)).toBeFalsy();
  });
});
