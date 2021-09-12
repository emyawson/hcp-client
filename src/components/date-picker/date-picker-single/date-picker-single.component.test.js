import { shallow, mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

import { DatePickerSingle } from './date-picker-single.component';

const mockDatesChange = jest.fn().mockName('onDatesChange');
const mockOutOfRange = jest.fn().mockName('checkIfDateOutOfRange');

const initialDate = '2018-02-27T00:00:00.000Z';
const initialMonth = '2018-01-27T00:00:00.000Z';
const newDate = '2018-03-27T00:00:00.000Z';

const mockProps = {
  onDateChange: mockDatesChange,
  checkIfDateOutOfRange: mockOutOfRange,
  date: initialDate,
};

describe('Date Picker', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<DatePickerSingle {...mockProps} focused />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DatePickerSingle {...mockProps} />, div);
  });

  it('should set initial date state from props', () => {
    const wrapper = mount(<DatePickerSingle {...mockProps} />);
    expect(
      wrapper
        .state()
        .date.toDate()
        .toISOString(),
    ).toEqual(initialDate);
  });

  it('should update only if a date is passed through props', () => {
    const wrapper = mount(<DatePickerSingle {...mockProps} />);
    wrapper.setProps({});
    expect(
      wrapper
        .state()
        .date.toDate()
        .toISOString(),
    ).toEqual(initialDate);
    wrapper.setProps({ date: newDate });
    expect(
      wrapper
        .state()
        .date.toDate()
        .toISOString(),
    ).toEqual(newDate);
  });

  it('should notify other components on date change', () => {
    const wrapper = shallow(<DatePickerSingle {...mockProps} />);
    // TODO: Remove reliance on MomentJS
    const mockDate = moment('Wed Nov 29 2017 10:10:41Z');
    wrapper.instance().handleOnDateChange(mockDate);
    expect(wrapper.state().date).toEqual(mockDate);
    expect(mockDatesChange).toHaveBeenCalled();
  });

  it('should collapse on click outside its bounds', () => {
    const wrapper = mount(<DatePickerSingle {...mockProps} />);
    wrapper.instance().collapseCalendar();
    expect(wrapper.state().focused).toBeFalsy();
  });

  it('should render a default state if no initial date is provided', () => {
    const wrapper = shallow(
      <DatePickerSingle {...mockProps} date={undefined} />,
    );
    expect(wrapper.state().initialMonth).toBeDefined();
  });
  it('should update state based on library date picker actions', () => {
    const wrapper = shallow(<DatePickerSingle {...mockProps} />);
    wrapper
      .find(SingleDatePicker)
      .first()
      .props()
      .onFocusChange({ focused: true });
    expect(wrapper.state().focused).toBeTruthy();
  });
  it('should verify dates using a function passed in props', () => {
    const wrapper = shallow(<DatePickerSingle {...mockProps} />);
    wrapper
      .find(SingleDatePicker)
      .first()
      .props()
      .isOutsideRange(moment(initialDate));
    expect(mockOutOfRange).toHaveBeenCalled();
  });
  it('should pass computed initial month to library date picker', () => {
    const wrapper = shallow(<DatePickerSingle {...mockProps} />);
    expect(
      wrapper
        .find(SingleDatePicker)
        .first()
        .props()
        .initialVisibleMonth()
        .toDate()
        .toISOString(),
    ).toEqual(initialMonth);
  });
});
