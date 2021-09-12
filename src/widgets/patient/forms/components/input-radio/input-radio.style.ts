import styled, { css } from 'styled-components';

import { convertPxToRem, createStyledComponent } from 'src/utils';

const RadioButtonIndicatorActive = css`
  background-color: ${({ theme }) => theme.colors.brandBlue};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.brandBlue};
`;

export const RadioButtonIndicatorSpan = createStyledComponent<'span', any>(
  'span',
)`
  border-radius: ${({ theme }) => theme.borderRadius[5]};
  border: ${convertPxToRem(2)} solid ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.charcoal};
  content: '';
  cursor: pointer;
  display: inline-block;
  height: ${({ theme }) => theme.spacing.three};
  width: ${({ theme }) => theme.spacing.three};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    ${RadioButtonIndicatorActive};
  }
`;

export const RadioButtonLabelSpan = styled.span`
  color: ${({ theme }) => theme.colors.charcoal};
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  margin-left: ${({ theme }) => theme.spacing.two};
`;

export const RadioButtonLabelWrapper = createStyledComponent<any, any>('label')`
  align-items: center;
  display: flex;

  input {
    left: -999px;
    opacity: 0;
    position: absolute;
  }

  input:focus + ${RadioButtonIndicatorSpan} {
    background-color: ${({ theme }) => theme.colors.blueMarine};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.blueMarine};
  }

  input:checked + ${RadioButtonIndicatorSpan} {
    ${RadioButtonIndicatorActive};
  }
`;
