import React from 'react';
import { shallow } from 'enzyme';

import { maskUserNumberInput } from 'src/utils';

import {
  disableBrowserValidation,
  shouldReplaceValue,
  shouldReduceValue,
  onBlurHandler,
  NumberInputField,
} from './number-input-field.component';

describe('Number input field - disable browser validation - helper util', () => {
  it('calls prevent default function on event', () => {
    const mockPreventDefault = jest.fn();
    const mockEvent = { preventDefault: mockPreventDefault };
    disableBrowserValidation(mockEvent);
    expect(mockPreventDefault).toBeCalled();
  });
});

describe('Number input field - should replace value - helper util', () => {
  it('returns true if input value is empty', () => {
    expect(shouldReplaceValue('', 0)).toEqual(true);
  });
  it('returns true if value is smaller than minimum', () => {
    expect(shouldReplaceValue('0', 1)).toEqual(true);
  });
  it('returns false if value is greater than minimum', () => {
    expect(shouldReplaceValue('9', 1)).toEqual(false);
  });
});

describe('Number input field - should reduce value - helper util', () => {
  it('returns true if input value is greater than max', () => {
    expect(shouldReduceValue('100', 10)).toEqual(true);
  });
  it('returns false if value is less than max', () => {
    expect(shouldReduceValue('9', 10)).toEqual(false);
  });
});

describe('Number input field - on blur handler', () => {
  it('calls update function with min if value is empty', () => {
    const mockUpdateFn = jest.fn();
    const mockEvent = {
      target: { value: '' },
    };
    onBlurHandler(99, 0, mockUpdateFn)(mockEvent);
    expect(mockUpdateFn).toBeCalledWith(0);
  });
  it('calls update function with min if value is less than min', () => {
    const mockUpdateFn = jest.fn();
    const mockEvent = {
      target: { value: '-4' },
    };
    onBlurHandler(50, 0, mockUpdateFn)(mockEvent);
    expect(mockUpdateFn).toBeCalledWith(0);
  });
  it('calls update function with max if value is greater than max', () => {
    const mockUpdateFn = jest.fn();
    const mockEvent = {
      target: { value: '80' },
    };
    onBlurHandler(50, 0, mockUpdateFn)(mockEvent);
    expect(mockUpdateFn).toBeCalledWith(50);
  });
  it('calls update function with value', () => {
    const mockUpdateFn = jest.fn();
    const mockEvent = {
      target: { value: '80' },
    };
    onBlurHandler(100, 0, mockUpdateFn)(mockEvent);
    expect(mockUpdateFn).toBeCalledWith(80);
  });
});

describe('Number input field component', () => {
  const baseProps = {
    id: '1',
    model: 'numberOfStrips',
    min: 0,
    max: 99,
    updateField: () => {},
  };
  it('renders correctly', () => {
    const mockProps = {
      ...baseProps,
      disabled: true,
    };
    const wrapper = shallow(<NumberInputField {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with default props', () => {
    const wrapper = shallow(<NumberInputField {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('calls passed in update field function with event target value', () => {
    const mockUpdateFieldFn = jest.fn();
    const mockProps = {
      ...baseProps,
      updateField: mockUpdateFieldFn,
    };
    const wrapper = shallow(<NumberInputField {...mockProps} />);
    wrapper.props().onChange({ target: { value: '99' } });
    expect(mockUpdateFieldFn).toBeCalledWith('99');
  });
  it('returns result of mask util after calling with value and max', () => {
    const wrapper = shallow(<NumberInputField {...baseProps} />);
    expect(wrapper.props().parser(2)).toEqual(
      maskUserNumberInput(2, baseProps.max),
    );
  });
});
