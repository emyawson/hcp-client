import React from 'react';
import { pathOr } from 'ramda';

import { ControlCustom } from 'src/components';
import { DateRangeIcon } from 'src/assets/icons';
import { RenderIf } from 'src/utils';

import {
  LabelledDatePickerDiv,
  DatePickerIconSpan,
  DatePickerArrowSpan,
} from './labelled-date-picker.style';

import DatePicker from '../date-picker.component';
import { DatePickerSingle } from '../date-picker-single';
import { Arrow } from '../../dropdown/dropdown.component';
import {
  LabelledDropdownContainerDiv,
  DropdownLabel,
} from '../../dropdown/labelled-dropdown/labelled-dropdown.style';

// -- Outputs a date picker component styled to match form dropdowns --

// For Single Date Pickers:
// Initial date should be passed with the 'date' prop
// onDateChange handler will pass the user selection to RRF, using onChange prop

// For Date Range Pickers:
// Initial dates should be passed with the 'startDate', 'endDate' props
// RRF will expect date range input to be set up as an object: { startDate, endDate }
// onDatesChange handler will pass the user selected dates to RRF, using onChange prop

export const LabelledDatePicker = ({
  date,
  displayFormat,
  endDate = null,
  label,
  labelIsInline = false,
  modelPath,
  onChange,
  showIcon = false,
  single = false,
  startDate = null,
  isPresetsPanelDisplayed,
  checkIfDateOutOfRange,
}) => (
  <LabelledDropdownContainerDiv labelIsInline={labelIsInline}>
    <DropdownLabel htmlFor={modelPath} labelIsInline={labelIsInline}>
      {label}
    </DropdownLabel>
    <LabelledDatePickerDiv showIcon={single && showIcon}>
      <ControlCustom
        model={modelPath}
        component={single ? DatePickerSingle : DatePicker}
        mapProps={{
          checkIfDateOutOfRange,
          date: props => pathOr(date, ['modelValue'], props),
          displayFormat,
          endDate: props => pathOr(endDate, ['modelValue', 'endDate'], props),
          isPresetsPanelDisplayed,
          onDateChange: () => dateChanged => onChange(dateChanged),
          onDatesChange: () => (startDateChanged, endDateChanged) => {
            onChange(startDateChanged, endDateChanged);
          },
          readOnly: () => true,
          single,
          startDate: props =>
            pathOr(startDate, ['modelValue', 'startDate'], props),
        }}
      />
      <RenderIf validate={single && showIcon}>
        <DatePickerIconSpan>
          <DateRangeIcon height={20} />
        </DatePickerIconSpan>
      </RenderIf>
      <RenderIf validate={single}>
        <DatePickerArrowSpan>
          <Arrow />
        </DatePickerArrowSpan>
      </RenderIf>
    </LabelledDatePickerDiv>
  </LabelledDropdownContainerDiv>
);
