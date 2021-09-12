import React from 'react';
import { shallow } from 'enzyme';

import { NumberInput } from './number-input.component';

describe('Number input component', () => {
  const baseProps = {
    initialValue: 0,
    id: 'testInput',
    model: 'numberOfStrips',
    min: 0,
    max: 99,
  };

  it('renders correctly', () => {
    const wrapper = shallow(<NumberInput {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the given value update function and updates state with parsed int value', () => {
    const mockFn = jest.fn();
    const mockProps = {
      ...baseProps,
      updateValue: mockFn,
    };
    const wrapper = shallow(<NumberInput {...mockProps} />);
    wrapper.instance().updateField('88');
    expect(mockFn).toBeCalledWith(88);
    expect(wrapper.state('modelValue')).toEqual(88);
  });

  it('updates model value with empty string', () => {
    const mockProps = {
      ...baseProps,
      updateValue: () => null,
    };
    const wrapper = shallow(<NumberInput {...mockProps} />);
    wrapper.instance().updateField('');
    expect(wrapper.state('modelValue')).toEqual('');
  });

  it('increments model value in state', () => {
    const mockProps = {
      ...baseProps,
      initialValue: 2,
      updateValue: () => {},
    };
    const wrapper = shallow(<NumberInput {...mockProps} />);
    wrapper.instance().increment();
    expect(wrapper.state('modelValue')).toEqual(3);
  });

  it('sets value to max if model value is equal or greater to max', () => {
    const mockProps = {
      ...baseProps,
      initialValue: 10,
      max: 10,
      updateValue: () => {},
    };
    const wrapper = shallow(<NumberInput {...mockProps} />);
    wrapper.instance().increment();
    expect(wrapper.state('modelValue')).toEqual(10);
  });

  it('decrements model value in state', () => {
    const mockProps = {
      ...baseProps,
      initialValue: 2,
      updateValue: () => {},
    };
    const wrapper = shallow(<NumberInput {...mockProps} />);
    wrapper.instance().decrement();
    expect(wrapper.state('modelValue')).toEqual(1);
  });

  it('sets value to min if model value is equal or less than min', () => {
    const mockProps = {
      ...baseProps,
      initialValue: 2,
      min: 2,
      updateValue: () => {},
    };
    const wrapper = shallow(<NumberInput {...mockProps} />);
    wrapper.instance().decrement();
    expect(wrapper.state('modelValue')).toEqual(2);
  });
});
