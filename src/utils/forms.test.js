import { mount } from 'enzyme';
import React from 'react';

import {
  addLocalFormDispatchHandlers,
  castValueToDisplayString,
  getInputValue,
  maskInputMaxLength,
  maskUserNumberInput,
  maxInputLength,
  sanitizeNumericInput,
} from './forms';

describe('Get input value forms util tests', () => {
  it('Returns input event target value converted to string', () => {
    const event = {
      target: { value: 8 },
    };
    expect(getInputValue(event)).toEqual('8');
  });
  it('Returns input event value converted to string', () => {
    const event = 8;
    expect(getInputValue(event)).toEqual('8');
  });
});

describe('Mask input max length forms util tests', () => {
  it('Returns empty string on empty input value', () => {
    expect(maskInputMaxLength('', 2)).toEqual('');
  });
  it('Returns the string value if its digits are within max character length', () => {
    expect(maskInputMaxLength(23, 2)).toEqual('23');
  });
  it('Returns the string value truncated to maximum character length if digits go over the max length', () => {
    expect(maskInputMaxLength(233, 2)).toEqual('23');
  });
});

describe('Max input length forms util tests', () => {
  it('Returns how many digits input number has', () => {
    expect(maxInputLength(99)).toEqual(2);
  });
});

describe('Mask user number input forms util tests', () => {
  it('Returns empty string if given empty string value', () => {
    expect(maskUserNumberInput('', 1)).toEqual('');
  });
  it('Returns number if its digits do not exceed max digit length', () => {
    expect(maskUserNumberInput(10, 99)).toEqual(10);
  });
  it('Returns number truncated to maximum number of digits if it exceeds max digit length', () => {
    expect(maskUserNumberInput(100, 99)).toEqual(10);
  });
});

describe('Local form HOC tests', () => {
  it('Updating value calls attached dispatch function', () => {
    const SampleComponent = () => <div>form</div>;
    const ComponentWithLocalFormHandlers = addLocalFormDispatchHandlers(
      SampleComponent,
    );
    const wrapper = mount(<ComponentWithLocalFormHandlers />);
    const mockDispatch = jest.fn();
    wrapper
      .find(SampleComponent)
      .props()
      .attachDispatch(mockDispatch);
    wrapper
      .find(SampleComponent)
      .props()
      .updateValue('model', 'value');
    expect(mockDispatch).toBeCalled();
  });
});

describe('Cast value to display string forms util tests', () => {
  it('Casts model value to string', () => {
    expect(castValueToDisplayString({ modelValue: 3 })).toEqual('3');
  });
});

describe('Sanitize numeric input forms util tests', () => {
  it('Replaces all non numeric characters', () => {
    expect(sanitizeNumericInput('!@b3a')).toEqual('3');
  });
  it('Replaces non numeric characters but maintains negative numbers', () => {
    expect(sanitizeNumericInput('-3')).toEqual('-3');
  });
});
