import React from 'react';
import { shallow } from 'enzyme';

import { ArrowButton } from './arrow-button.component';

const mockOnClick = jest.fn();

describe('Arrow Button', () => {
  it('renders correctly pointing down', () => {
    const wrapper = shallow(<ArrowButton />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly pointing up', () => {
    const wrapper = shallow(<ArrowButton direction="up" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly with default props', () => {
    const wrapper = shallow(<ArrowButton />);
    expect(wrapper).toMatchSnapshot();
  });
  it('dispatches an event on click', () => {
    const wrapper = shallow(<ArrowButton onClick={mockOnClick} />);
    wrapper.props().onClick(1);
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnClick).toHaveBeenCalledWith(1);
  });
  it('dispatches a default event onclick if none is set', () => {
    const defaultWrapper = shallow(<ArrowButton />);
    defaultWrapper.props().onClick(); // Necessary to complete branch coverage
    expect(defaultWrapper.props().onClick).toBeDefined();
  });
});
