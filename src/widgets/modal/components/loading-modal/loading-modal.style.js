import styled from 'styled-components';

import { spacing, colors } from 'src/core';
import { convertPxToRem, combineRems } from 'src/utils';

export const LoadingModalContentDiv = styled.div`
  width: ${convertPxToRem(336)};
  padding: ${combineRems(spacing.three, spacing.four)} 0;
`;

export const ConfirmationButtonWrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid ${colors.grayLight};
  margin-top: ${combineRems(spacing.three, spacing.four)};
  padding-top: ${combineRems(spacing.three, spacing.four)};
`;
