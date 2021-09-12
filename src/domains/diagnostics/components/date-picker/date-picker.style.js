import styled, { injectGlobal } from 'styled-components';

import {
  colors,
  zIndexes,
  fontSize,
  spacing,
  boxShadows,
} from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';

const presetWrapperWidth = '8rem';
const presetWrapperLeftPosition = `-${presetWrapperWidth}`;

export const PresetWrapper = styled.div`
  position: absolute;
  top: -0.0625rem;
  left: ${presetWrapperLeftPosition};
  height: calc(100% + 3.0625rem);
  width: ${presetWrapperWidth};
  background: ${colors.white};
  border: 1px solid ${colors.silver};
  padding: ${spacing.two} 0;
  z-index: 2;
`;

export const DoneButtonWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: ${props =>
    props.isPresetsPanelDisplayed ? presetWrapperLeftPosition : '0'};
  right: -0.0625rem;
  height: 3rem;
  background: ${colors.white};
  border: 1px solid ${colors.silver};
  border-top: none;
  text-align: right;
  z-index: 1;
`;

export const DropShadowWrapper = styled.div`
  position: absolute;
  top: 0;
  left: ${props =>
    props.isPresetsPanelDisplayed ? presetWrapperLeftPosition : '0'};
  width: ${props =>
    props.isPresetsPanelDisplayed
      ? `calc(100% + ${presetWrapperWidth})`
      : '100%'};
  height: ${props =>
    props.isPresetsPanelDisplayed ? 'calc(100% + 3rem)' : '100%'};
  box-shadow: ${boxShadows.two};
  z-index: -1;
`;

DropShadowWrapper.displayName = 'DropShadowWrapper';

export const DoneButton = styled.button`
  height: 2rem;
  width: 6.25rem;
  margin-right: 1.25rem;
  border-radius: 1rem;
  font-size: ${fontSize.caption};
  font-weight: ${weight.bold};
  background-color: ${colors.blue};
  color: ${colors.white};
  border: none;
  cursor: pointer;
`;

export const PresetButton = styled.button`
  background: none;
  border: none;
  font-size: ${fontSize.caption};
  padding: ${spacing.two} ${spacing.three};
  margin-bottom: ${spacing.two};
  position: relative;
  cursor: pointer;
  outline: none;
  color: ${colors.charcoal};
  display: block;
  &:after {
    background-color: transparent;
    top: 0;
    bottom: 0;
    left: 0;
    border-radius: 0.25rem;
    content: '';
    display: block;
    width: 0.3rem;
    position: absolute;
  }
  &.active {
    color: ${colors.blue};
    font-weight: 600;
  }
  &.active:after {
    background-color: ${colors.blue};
  }
`;

// Date Picker style overrides
// tslint:disable:no-unused-expression
injectGlobal`
.DateRangePicker_picker {
  z-index: ${zIndexes.popover};
}
.DateRangePicker_picker__openDown {
  left: 8rem;
  top: 2.75rem;
}

.DayPicker__horizontal {
  border-radius: 0;
}

.CalendarDay_button {
  font-size: ${fontSize.p};
}

.CalendarDay__selected_span,
.CalendarDay__selected_span:hover,
.CalendarDay__selected_span:active {
  background: ${colors.silver};
  border-color:${colors.silverDark};
  color: ${colors.charcoal};
}

.CalendarDay__hovered_span,
.CalendarDay__hovered_span:hover,
.CalendarDay__hovered_span:active {
  background: ${colors.silver};
  border-color: ${colors.silverDark};
  color: ${colors.charcoal};
}

.CalendarDay__selected,
.CalendarDay__selected:active,
.CalendarDay__selected:hover,
.CalendarDay__selected_end,
.CalendarDay__selected_end:active,
.CalendarDay__selected_end:hover,
.CalendarDay__selected_start,
.CalendarDay__selected_start:active,
.CalendarDay__selected_start:hover {
  background: ${colors.brandBlue};
  border: 1px solid ${colors.brandBlue};
  color: ${colors.white};
}

.DayPickerKeyboardShortcuts_show__bottomRight {
  right: 9rem;
  bottom: -1.75rem;
  border: 1px solid ${colors.brandBlue};
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${colors.white};
  border-radius: 0.75rem;
}

.DayPickerKeyboardShortcuts_showSpan {
  font-size: ${fontSize.p};
  font-weight: 700;
  color: ${colors.brandBlue};
}

.DayPickerKeyboardShortcuts_showSpan__bottomRight {
  right: 0.45rem;
  top: 0.125rem;
}

.DayPickerKeyboardShortcuts_show__bottomRight:hover {
  border: 1px solid ${colors.brandBlue};
}

.DateInput_input__focused {
  color: ${colors.brandBlue};
}

.DateInput__withCaret:after,
.DateInput__withCaret:before {
  content: none;
}

.CalendarMonth_caption {
  padding-bottom: 3rem;
  color: ${colors.charcoal};
}

.DayPicker_weekHeader {
  color: ${colors.charcoal};
}

.DayPicker_weekHeader_li small {
  font-weight: ${weight.semiBold};
}

.DateInput {
  width: 6.875rem;
}

.DateInput_input {
  padding: ${spacing.two} ${spacing.three};
  font-size: 0.875rem;
  font-weight: 600;
  border-bottom: none;
}

.DateRangePickerInput__withBorder {
  border: 1px solid ${colors.silverDark};
  border-radius: 5px;
  overflow: auto;
}
`; // tslint:enable:no-unused-expression
