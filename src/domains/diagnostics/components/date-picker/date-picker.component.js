import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { isNil, equals } from 'ramda';
import moment from 'moment';
import { Moment } from 'moment';

import { RenderIf } from 'src/domains/diagnostics/utils';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

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

type Props = {
  onDatesChange: (startDate: Date, endDate: Date) => void,
  startDate?: Date,
  endDate?: Date,
  startDateId?: string,
  endDateId?: string,
  isPresetsPanelDisplayed?: boolean,
};

type State = {
  startDate?: Moment,
  endDate?: Moment,
  savedStartDate?: Moment,
  savedEndDate?: Moment,
  initialMonth: Moment,
  focusedInput: string,
};

// the state props savedStartDate and savedEndDate are used
// to reset the datepicker dates to their previous value if
// the user clicks outside the pop-up (closing without saving)

class DatePicker extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      startDate: momentOrNull(props.startDate),
      endDate: momentOrNull(props.endDate),
      savedStartDate: momentOrNull(props.startDate),
      savedEndDate: momentOrNull(props.endDate),
      initialMonth: isNil(props.endDate)
        ? moment().subtract(1, 'month')
        : toMomentGMT(props.endDate).subtract(1, 'month'),
      focusedInput: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.endDate) {
      this.setState({
        startDate: toMomentGMT(nextProps.startDate),
        endDate: toMomentGMT(nextProps.endDate),
        savedStartDate: momentOrNull(nextProps.startDate),
        savedEndDate: momentOrNull(nextProps.endDate),
        initialMonth: toMomentGMT(nextProps.endDate).subtract(1, 'month'),
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
      checkIfDateOutOfRange,
      displayFormat,
      readOnly,
    } = this.props;
    const { startDate, endDate, initialMonth, focusedInput } = this.state;

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
          focusedInput={focusedInput}
          onFocusChange={focusedInput => {
            this.setState({ focusedInput });
          }}
          displayFormat={displayFormat}
          renderCalendarInfo={this.renderDatePresets}
          isOutsideRange={date =>
            checkIfDateOutOfRange(date, earliestDate, lastDate)
          }
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
                {preset.label}
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
    const nextState: State = { startDate, endDate };
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
        savedStartDate: startDate,
        savedEndDate: endDate,
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
        startDate: savedStartDate,
        endDate: savedEndDate,
      });
    }
  };

  handleOnDatesChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate,
    });
  };
}

DatePicker.defaultProps = {
  startDate: null,
  endDate: null,
  isPresetsPanelDisplayed: true,
  checkIfDateOutOfRange,
  displayFormat: 'DD/MM/YYYY',
  readOnly: false,
};

export default DatePicker;
