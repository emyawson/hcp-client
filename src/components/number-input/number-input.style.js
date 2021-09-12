import styled from 'styled-components';

import { borderRadius, colors, fontSize } from 'src/core';

import { NumberInputFieldControl } from './number-input-field/number-input-field.style';

const colorBorder = colors.grayLight;

export const NumberInputContainer = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.three};
  border: 1px solid ${colorBorder};
  font-size: ${fontSize.p};
  display: inline-flex;
  overflow: hidden;

  ${NumberInputFieldControl} {
    border: 1px solid transparent;
    border-radius: 0;
  }
`;

export const NumberInputOperatorWrapper = styled.div`
  border-left: 1px solid ${colorBorder};
  display: flex;
  flex-direction: column;
`;

export const OperatorDivider = styled.div`
  background-color: ${colorBorder};
  height: 1px;
  width: 100%;
`;

// Vertically center subtract icon with the PlusIcon
export const MinusIconSpan = styled.span`
  display: inline-block;
  transform: translateY(-3px);
`;
