import { shallow, mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

import DatePicker from './date-picker.component';
import {
  presets,
  isPresetButtonActive,
  isCustomActive,
} from './date-picker.util';

const mockDatesChange = jest.fn();
const mockOutOfRange = jest.fn();

const newDate = '2018-02-27T00:00:00.000Z';
const newMonth = '2018-01-27T00:00:00.000Z';

const startDate = '2017-11-29T15:10:41.000Z';
const endDate = '2017-12-05T15:10:41.000Z';

// @TODO: remove momentjs
const mockProps = {
  onDatesChange: mockDatesChange,
  checkIfDateOutOfRange: mockOutOfRange,
  startDate: new Date(startDate),
  endDate: new Date(endDate),
};

describe('Date Picker', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<DatePicker {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DatePicker {...mockProps} />, div);
  });

  it('should update only if a date is passed through props', () => {
    const wrapper = mount(<DatePicker {...mockProps} />);
    wrapper.setProps({});
    expect(
      wrapper
        .state()
        .startDate.toDate()
        .toISOString(),
    ).toEqual(startDate);

    wrapper.setProps({ startDate: newDate });
    expect(
      wrapper
        .state()
        .startDate.toDate()
        .toISOString(),
    ).toEqual(newDate);
  });

  it('should change dates when requested', () => {
    const wrapper = mount(<DatePicker {...mockProps} />);
    // TODO: Remove MomentJS
    wrapper.instance().handleOnDatesChange({
      startDate: moment(startDate),
      endDate: moment(newDate),
    });
    expect(
      wrapper
        .state()
        .endDate.toDate()
        .toISOString(),
    ).toEqual(newDate);
  });

  it('should change dates when a preset is selected', () => {
    const wrapper = mount(<DatePicker {...mockProps} />);
    // TODO: Remove MomentJS
    wrapper.instance().setDatesFromPreset(undefined, moment(newDate));
    expect(
      wrapper
        .state()
        .endDate.toDate()
        .toISOString(),
    ).toEqual(newDate);
    wrapper.instance().setDatesFromPreset(moment(newDate), undefined);
    expect(
      wrapper
        .state()
        .startDate.toDate()
        .toISOString(),
    ).toEqual(newDate);
  });

  it('should reset dates to saved state on close', () => {
    const wrapper = mount(<DatePicker {...mockProps} />);
    // TODO: Remove MomentJS
    wrapper.setState({
      savedStartDate: moment(startDate),
      savedEndDate: moment(endDate),
      startDate: moment(startDate),
      endDate: moment(newDate),
    });
    wrapper.instance().handleOnClose();
    expect(
      wrapper
        .state()
        .savedEndDate.toDate()
        .toISOString(),
    ).toEqual(endDate);
  });

  it('should notify other components on date change confirmation', () => {
    const wrapper = mount(<DatePicker {...mockProps} />);
    wrapper.instance().handleClickDone();
    expect(mockDatesChange).toHaveBeenCalled();
  });

  it('should collapse on click outside its bounds', () => {
    const wrapper = mount(<DatePicker {...mockProps} />);
    wrapper.instance().collapseCalendar();
    expect(wrapper.state().focusedInput).toBeFalsy();
  });

  it('should update state based on library date picker actions', () => {
    const wrapper = shallow(<DatePicker {...mockProps} />);
    wrapper
      .find(DateRangePicker)
      .first()
      .props()
      .onFocusChange('startDate');
    expect(wrapper.state().focusedInput).toBe('startDate');
  });
  it('should verify dates using a function passed in props', () => {
    const wrapper = shallow(<DatePicker {...mockProps} />);
    wrapper
      .find(DateRangePicker)
      .first()
      .props()
      .isOutsideRange(moment(newDate));
    expect(mockOutOfRange).toHaveBeenCalled();
  });
  it('should render a default state if no initial date is provided', () => {
    const wrapper = shallow(<DatePicker {...mockProps} endDate={undefined} />);
    expect(wrapper.state().initialMonth).toBeDefined();
  });
  it('should pass computed initial month to library date picker', () => {
    const wrapper = shallow(<DatePicker {...mockProps} endDate={newDate} />);
    expect(
      wrapper
        .find(DateRangePicker)
        .first()
        .props()
        .initialVisibleMonth()
        .toDate()
        .toISOString(),
    ).toEqual(newMonth);
  });
});

describe('Date Picker Utils', () => {
  it('returns true when preset matches the date selections in state', () => {
    const mockState = {
      startDate: moment().subtract(29, 'day'),
      endDate: moment(),
    };
    const preset = presets[3];
    expect(isPresetButtonActive(mockState, preset)).toBe(true);
  });
  it('returns false when preset does not match the date selections in state', () => {
    const mockState = {
      startDate: moment().subtract(25, 'day'),
      endDate: moment(),
    };
    const preset = presets[3];
    expect(isPresetButtonActive(mockState, preset)).toBe(false);
  });
  it('returns true when selections in state does not match any presets', () => {
    const mockState = {
      startDate: moment().subtract(100, 'day'),
      endDate: moment(),
    };
    expect(isCustomActive(mockState)).toBe(true);
  });
});
