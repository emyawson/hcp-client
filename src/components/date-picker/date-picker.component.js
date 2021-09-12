import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { isNil, equals } from 'ramda';
import moment from 'moment/min/moment-with-locales';

import { RenderIf } from 'src/utils';
import { translate } from 'src/i18n';

import {
  PresetButton,
  PresetWrapper,
  DoneButtonWrapper,
  DoneButton,
  DropShadowWrapper,
} from './date-picker.style';
import {
  presets,
  isPresetButtonActive,
  isCustomActive,
  momentOrNull,
  dateOrNull,
  checkIfDateOutOfRange,
  toMomentGMT,
} from './date-picker.util';

// the state props savedStartDate and savedEndDate are used
// to reset the datepicker dates to their previous value if
// the user clicks outside the pop-up (closing without saving)

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: momentOrNull(props.endDate),
      focusedInput: null,
      initialMonth: isNil(props.endDate)
        ? moment().subtract(1, 'month')
        : toMomentGMT(props.endDate).subtract(1, 'month'),
      savedEndDate: momentOrNull(props.endDate),
      savedStartDate: momentOrNull(props.startDate),
      startDate: momentOrNull(props.startDate),
    };
    moment.locale(props.locale);
  }

  componentWillReceiveProps(nextProps) {
    moment.locale(nextProps.locale);
    if (nextProps.endDate) {
      this.setState({
        endDate: toMomentGMT(nextProps.endDate),
        initialMonth: toMomentGMT(nextProps.endDate).subtract(1, 'month'),
        savedEndDate: momentOrNull(nextProps.endDate),
        savedStartDate: momentOrNull(nextProps.startDate),
        startDate: toMomentGMT(nextProps.startDate),
      });
    }
  }

  render() {
    const {
      disabled,
      startDateId,
      endDateId,
      lastDate,
      earliestDate,
      checkIfDateOutOfRange: checkOutOfRange,
      displayFormat,
      readOnly,
    } = this.props;
    const {
      startDate,
      endDate,
      initialMonth,
      focusedInput: focusedInputState,
    } = this.state;

    return (
      <div ref={node => (this.wrapper = node)}>
        <DateRangePicker
          disabled={disabled}
          startDate={startDate}
          endDate={endDate}
          startDateId={startDateId || 'startDateInput'}
          endDateId={endDateId || 'endDateInput'}
          startDatePlaceholderText={translate('datePicker.startDate')}
          endDatePlaceholderText={translate('datePicker.endDate')}
          minimumNights={0}
          keepOpenOnDateSelect
          initialVisibleMonth={a => initialMonth}
          onDatesChange={this.handleOnDatesChange}
          focusedInput={focusedInputState}
          onFocusChange={focusedInput => {
            this.setState({ focusedInput });
          }}
          displayFormat={displayFormat}
          renderCalendarInfo={this.renderDatePresets}
          isOutsideRange={date => checkOutOfRange(date, earliestDate, lastDate)}
          onClose={this.handleOnClose}
          readOnly={readOnly}
        />
      </div>
    );
  }

  renderDatePresets = () => {
    const { isPresetsPanelDisplayed } = this.props;
    return (
      <div>
        <DropShadowWrapper isPresetsPanelDisplayed={isPresetsPanelDisplayed} />
        <RenderIf validate={isPresetsPanelDisplayed}>
          <PresetWrapper>
            {presets.map(preset => (
              <PresetButton
                key={preset.label}
                className={
                  isPresetButtonActive(this.state, preset) ? 'active' : null
                }
                onClick={() => {
                  this.setDatesFromPreset(preset.startDate, preset.endDate);
                }}
              >
                {translate(preset.label)}
              </PresetButton>
            ))}
            <PresetButton
              className={isCustomActive(this.state) ? 'active' : null}
              onClick={() => this.setDatesFromPreset()}
            >
              {translate('datePicker.custom')}
            </PresetButton>
          </PresetWrapper>
        </RenderIf>
        <DoneButtonWrapper>
          <DoneButton onClick={this.handleClickDone}>
            {translate('datePicker.done')}
          </DoneButton>
        </DoneButtonWrapper>
      </div>
    );
  };

  setDatesFromPreset = (startDate = null, endDate = null) => {
    const nextState: State = { endDate, startDate };
    this.setState(nextState);
  };

  collapseCalendar = () => {
    this.wrapper.click();
  };

  handleClickDone = () => {
    const { onDatesChange } = this.props;
    const { startDate, endDate } = this.state;
    this.setState(
      {
        savedEndDate: endDate,
        savedStartDate: startDate,
      },
      () => this.collapseCalendar(),
    );
    onDatesChange(dateOrNull(startDate.toDate()), dateOrNull(endDate.toDate()));
  };

  handleOnClose = () => {
    const { startDate, endDate, savedStartDate, savedEndDate } = this.state;
    // This checks if the selected dates are equal to the saved dates
    // so that if the pop-up was closed without saving, the date picker values
    // can be reset to their previously saved value
    if (!equals(startDate, savedStartDate) || !equals(endDate, savedEndDate)) {
      this.setState({
        endDate: savedEndDate,
        startDate: savedStartDate,
      });
    }
  };

  handleOnDatesChange = ({ startDate, endDate }) => {
    this.setState({
      endDate,
      startDate,
    });
  };
}

DatePicker.defaultProps = {
  checkIfDateOutOfRange,
  displayFormat: 'DD/MM/YYYY',
  endDate: null,
  isPresetsPanelDisplayed: true,
  readOnly: false,
  startDate: null,
};

export default DatePicker;
