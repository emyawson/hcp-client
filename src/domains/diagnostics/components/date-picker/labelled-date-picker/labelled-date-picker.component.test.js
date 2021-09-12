import React from 'react';
import { shallow } from 'enzyme';
import 'react-dates/initialize';

import { ControlCustom } from 'src/domains/diagnostics/components';
import { DateRangeIcon } from 'src/domains/diagnostics/assets/icons';

import { LabelledDatePicker } from './labelled-date-picker.component';

const startDate = '2017-11-29T15:10:41.000Z';
const endDate = '2017-12-05T15:10:41.000Z';
const initialDate = '2018-02-27T00:00:00.000Z';

const mockProps = {
  modelPath: 'testPath',
  label: 'Test Dropdown Datepicker',
};

describe('Labelled Date Picker test suite', () => {
  it('renders correctly with a single picker', () => {
    const mockSingleProps = {
      ...mockProps,
      single: true,
    };
    const wrapper = shallow(<LabelledDatePicker {...mockSingleProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly with a range picker', () => {
    const wrapper = shallow(<LabelledDatePicker {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a calendar icon if set by props', () => {
    const iconProps = {
      ...mockProps,
      single: true,
      showIcon: true,
    };
    const wrapper = shallow(<LabelledDatePicker {...iconProps} />);
    expect(wrapper.find(DateRangeIcon)).toHaveLength(1);
  });
  it('should set initial props on date range picker controlled input', () => {
    const onChange = jest.fn();
    const mockDateRangeProps = {
      ...mockProps,
      startDate,
      endDate,
      onChange,
    };
    const wrapper = shallow(<LabelledDatePicker {...mockDateRangeProps} />);
    const wrappedDatePickerInput = wrapper
      .find(ControlCustom)
      .first()
      .props().mapProps;

    expect(wrappedDatePickerInput.startDate()).toEqual(startDate);
    expect(wrappedDatePickerInput.endDate()).toEqual(endDate);
    wrappedDatePickerInput.onDatesChange()({});
    expect(onChange).toHaveBeenCalled();
  });
  it('should set initial props on single date picker controlled input', () => {
    const onChange = jest.fn();
    const mockSingleProps = {
      ...mockProps,
      onChange,
      single: true,
      date: initialDate,
    };
    const wrapper = shallow(<LabelledDatePicker {...mockSingleProps} />);
    const wrappedDatePickerInput = wrapper
      .find(ControlCustom)
      .first()
      .props().mapProps;

    expect(wrappedDatePickerInput.date()).toEqual(initialDate);
    wrappedDatePickerInput.onDateChange()({});
    expect(onChange).toHaveBeenCalled();
  });
});
