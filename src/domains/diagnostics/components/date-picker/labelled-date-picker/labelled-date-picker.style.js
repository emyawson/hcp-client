import styled from 'styled-components';

import {
  borderRadius,
  colors,
  spacing,
  transitions,
  zIndexes,
} from 'src/domains/diagnostics/styles';
import { convertPxToRem } from 'src/domains/diagnostics/utils';

const colorPlaceholder = colors.grayMedium;

const iconContainerSize = convertPxToRem(46);

export const IconSpan = styled.span`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: ${iconContainerSize};
  z-index: ${zIndexes.foreground};
`;
IconSpan.displayName = 'IconSpan';

export const DatePickerIconSpan = IconSpan.extend`
  border: 1px solid ${props => props.theme.colors.clear};
  left: 0;
  top: -2px;

  path {
    fill: ${props => props.theme.colors.brandBlue};
  }
`;
DatePickerIconSpan.displayName = 'DatePickerIconSpan';

export const DatePickerArrowSpan = IconSpan.extend`
  right: 0;
  transition: ${transitions.default};
  width: ${iconContainerSize};

  path {
    transition: ${transitions.default};
  }
`;
DatePickerArrowSpan.displayName = 'DatePickerArrowSpan';

export const LabelledDatePickerDiv = styled.div`
  position: relative;

  .SingleDatePicker,
  .SingleDatePickerInput,
  .DateRangePicker,
  .DateRangePickerInput,
  .DateInput_input {
    width: 100%;
  }

  .SingleDatePickerInput .DateInput {
    width: 100%;
  }

  .SingleDatePickerInput__withBorder,
  .DateRangePickerInput__withBorder {
    border-color: ${colors.grayLight};
    border-radius: ${borderRadius.three};
  }

  .DateInput {
    background-color: transparent;
  }

  .DateInput_input {
    background-color: ${props => props.theme.colors.white};
    border-radius: ${borderRadius.three};
    cursor: pointer;
    color: ${props => props.theme.charcoal};
    min-height: ${iconContainerSize};
    padding-left: ${props =>
      props.showIcon ? iconContainerSize : spacing.three};
    transition: ${transitions.default};

    ::-webkit-input-placeholder {
      color: ${colorPlaceholder};
    }
    ::-moz-placeholder {
      color: ${colorPlaceholder};
    }
    :-ms-input-placeholder {
      color: ${colorPlaceholder};
    }
  }
`;
LabelledDatePickerDiv.displayName = 'LabelledDatePickerDiv';
