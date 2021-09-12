import React from 'react';
import { shallow, mount } from 'enzyme';

import {
  withErrorMessage,
  withErrorState,
} from './with-error-message.component';

describe('With Error Message HoCs', () => {
  const Component = () => <span />;
  const ErrorComponent = () => <span>Loading</span>;
  describe('WithError', () => {
    it('should show an error if component contains hasError prop', () => {
      const WithError = withErrorMessage({ ErrorComponent })(Component);
      const wrapper = mount(<WithError hasError />);
      expect(wrapper.find(ErrorComponent)).toHaveLength(1);
    });
    it('should show original component if it does not contain hasError prop', () => {
      const WithError = withErrorMessage({ ErrorComponent })(Component);
      const wrapper = mount(<WithError />);
      expect(wrapper.find(Component)).toHaveLength(1);
    });
  });
  describe('withErrorState', () => {
    it('should apply a new set of props to a component on error', () => {
      const errorState = {
        disabled: true,
      };
      const WithErrorState = withErrorState(errorState)(Component);
      const wrapper = shallow(<WithErrorState />);
      expect(wrapper.props().disabled).toBeTruthy();
    });
  });
});
