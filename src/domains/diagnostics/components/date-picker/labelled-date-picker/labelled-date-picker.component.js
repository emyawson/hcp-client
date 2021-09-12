import React from 'react';
import { pathOr } from 'ramda';

import { ControlCustom } from 'src/domains/diagnostics/components';
import { DateRangeIcon } from 'src/domains/diagnostics/assets/icons';
import { RenderIf } from 'src/domains/diagnostics/utils';

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
          date: props => pathOr(date, ['modelValue'], props),
          endDate: props => pathOr(endDate, ['modelValue', 'endDate'], props),
          onDateChange: () => date => onChange(date),
          onDatesChange: () => (startDate, endDate) => {
            onChange(startDate, endDate);
          },
          startDate: props =>
            pathOr(startDate, ['modelValue', 'startDate'], props),
          checkIfDateOutOfRange,
          displayFormat,
          isPresetsPanelDisplayed,
          single,
          readOnly: () => true,
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
