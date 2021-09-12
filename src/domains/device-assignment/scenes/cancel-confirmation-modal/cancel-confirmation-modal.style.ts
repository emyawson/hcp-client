import styled from 'styled-components';

import { Column } from 'src/components/column';
import {
  borderRadius,
  colors,
  fontSize,
  fontWeights,
  spacing,
} from 'src/core/styles';

export const CancelConfirmationContentDiv = styled.div`
  border: 1px solid ${colors.quartzBlue};
  padding: ${spacing.four} ${spacing.five} ${spacing.five} ${spacing.five};
  background-color: ${colors.blueMarineAlpha};
  border-radius: ${borderRadius.three};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.four};
`;

export const CancelConfirmationTitleSpan = styled.span`
  font-weight: ${fontWeights.bold};
`;

export const CancelConfirmationSubheadingDiv = styled.div`
  color: ${colors.brandBlue};
  font-weight: ${fontWeights.bold};
  font-size: ${fontSize.title};
  padding-top: ${spacing.three};
`;

export const CancelConfirmationDescriptionDiv = styled.div`
  color: ${colors.charcoal};
  font-size: ${fontSize.subheading};
  font-weight: ${fontWeights.regular};
  padding-top: ${spacing.two};
`;

export const CancelConfirmationBody = styled(Column)`
  flex: 1 1 auto;
  padding: ${spacing.four};
`;
export const CancelConfirmationButtonsDiv = styled.div`
  display: flex;
  padding-top: ${spacing.four};
  justify-content: center;
`;
