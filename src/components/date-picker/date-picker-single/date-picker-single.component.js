import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import { isNil } from 'ramda';
import moment from 'moment';

import {
  dateOrNull,
  momentOrNull,
  isDatePastToday,
  toMomentGMT,
} from '../date-picker.util';
// Inject global styles
import * as DatePickerStyle from '../date-picker.style'; // eslint-disable-line
// Inject overrides for single datepicker global styles
import * as DatePickerSingleStyle from './date-picker-single.style'; // eslint-disable-line

export class DatePickerSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: momentOrNull(props.date),
      focused: false,
      initialMonth: isNil(props.date)
        ? moment().subtract(1, 'month')
        : toMomentGMT(props.date).subtract(1, 'month'),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date) {
      this.setState({
        date: toMomentGMT(nextProps.date),
        initialMonth: toMomentGMT(nextProps.date).subtract(1, 'month'),
      });
    }
  }

  render() {
    const {
      lastDate,
      checkIfDateOutOfRange,
      displayFormat,
      readOnly,
    } = this.props;
    const { date, initialMonth, focused: isFocused } = this.state;

    return (
      <div ref={node => (this.wrapper = node)}>
        <SingleDatePicker
          date={date}
          displayFormat={displayFormat}
          focused={isFocused}
          initialVisibleMonth={a => initialMonth}
          isOutsideRange={dateToCheck =>
            checkIfDateOutOfRange(dateToCheck, lastDate)
          }
          onDateChange={this.handleOnDateChange}
          onFocusChange={({ focused }) => {
            this.setState({ focused });
          }}
          renderCalendarInfo={this.renderDropShadow}
          readOnly={readOnly}
        />
      </div>
    );
  }

  renderDropShadow = () => <DatePickerStyle.DropShadowWrapper />;

  collapseCalendar = () => {
    this.wrapper.click();
  };

  handleOnDateChange = date => {
    this.setState({
      date,
    });
    this.props.onDateChange(dateOrNull(date));
  };
}

DatePickerSingle.defaultProps = {
  checkIfDateOutOfRange: isDatePastToday,
  date: null,
  displayFormat: 'MMM D YYYY',
  readOnly: false,
};
