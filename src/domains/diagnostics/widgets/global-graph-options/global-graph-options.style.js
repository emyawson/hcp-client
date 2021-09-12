import styled from 'styled-components';
import { space } from 'styled-system';

import { colors, spacing } from 'src/domains/diagnostics/styles';
import { combineRems } from 'src/domains/diagnostics/utils';

export const DateSliderWrapper = styled.div`
  border-top: 1px solid ${colors.grayLighter};
  padding: ${combineRems(spacing.one, spacing.two)} ${spacing.four};
`;
DateSliderWrapper.displayName = 'DateSliderWrapper';

export const OptionsWrapper = styled.div`
  display: flex;
`;
OptionsWrapper.displayName = 'OptionsWrapper';

export const Option = styled.div`
  ${space};
  width: ${props => props.width || 'auto'};
  height: ${spacing.five};
  ${props =>
    props.borderRight
      ? `border-right: 1px solid ${colors.grayLighter};`
      : null};
  ${props =>
    props.borderLeft ? `border-left: 1px solid ${colors.grayLighter};` : null};

  & .DateRangePicker_picker__openDown {
    left: 6rem !important;
  }
`;
Option.displayName = 'Option';

export const DatePickerWrapper = styled.div`
  height: calc(100% + 4px);
  display: flex;
  align-items: center;
`;
DatePickerWrapper.displayName = 'DatePickerWrapper';

export const DatePickerIconWrapper = styled.div`
  margin-right: ${spacing.three};
`;
DatePickerIconWrapper.displayName = 'DatePickerIconWrapper';
