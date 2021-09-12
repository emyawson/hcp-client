import { shallow } from 'enzyme';
import React from 'react';

import { InputText, Input, InputEmail, InputPassword } from './input.component';

describe('Input component', () => {
  test('it renders correctly', () => {
    const mockProps = {
      id: '1',
      model: 'model',
      type: 'text',
    };
    const wrapper = shallow(<Input {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Input text', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<InputText label="1234" model=".1324" />);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Input email', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<InputEmail label="1234" model=".1324" />);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Input password', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<InputPassword label="1234" model=".1324" />);
    expect(wrapper).toMatchSnapshot();
  });
});
