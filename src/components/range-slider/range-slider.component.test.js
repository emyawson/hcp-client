import React from 'react';
import { shallow } from 'enzyme';

import { RangeSlider } from './range-slider.component';

describe('RangeSlider Component Tests', () => {
  const mockOnChange = jest.fn().mockName('onRangeSliderValuesChanged');
  const mockProps = {
    minValue: 3,
    maxValue: 46,
    rangeMin: 0,
    rangeMax: 50,
    onChange: mockOnChange,
  };
  it('Should render correctly', () => {
    const wrapper = shallow(<RangeSlider {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should dispatch an event when user has changed values', () => {
    const wrapper = shallow(<RangeSlider {...mockProps} />);
    wrapper.setState({ minHandleValue: 5, maxHandleValue: 10 });
    wrapper.instance().handleOnChange();
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith({ min: 5, max: 10 });
  });
});
