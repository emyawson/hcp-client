import styled, { injectGlobal } from 'styled-components';

import { borderRadius, colors, spacing } from 'src/core';
import { P, Title, Subheading } from 'src/components';
import { weight } from 'src/components/fonts/weights';
import { HrReset } from 'src/core/styles/resets';
import { combineRems } from 'src/utils';

export const ContainerDiv = styled.div`
  max-width: 100%;
  padding: ${combineRems(spacing.three, spacing.four)}
    ${combineRems(spacing.three, spacing.four)} ${spacing.four};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

ContainerDiv.displayName = 'ContainerDiv';

export const DTCHeadline = Title.extend`
  color: ${colors.charcoal};
  font-weight: ${weight.semiBold};
  margin: 0 auto ${spacing.four};
`;
export const DTCSubheadline = P.extend`
  color: ${colors.grayDark};
  margin: 0 auto;
`;

export const DTCHr = HrReset.extend`
  border-bottom: 1px solid ${colors.grayLight};
`;

export const DTCIconPanel = styled.div`
  background-color: ${colors.blueMarineAlpha5};
  border: 1px solid ${colors.quartzBlue};
  border-radius: ${borderRadius.three};
  padding: ${spacing.four} ${spacing.five};
`;

export const MessageP = Subheading.extend`
  color: ${colors.charcoal};
  margin: 0 auto ${spacing.four};
`;

MessageP.displayName = 'MessageP';

export const ButtonContainerDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

ButtonContainerDiv.displayName = 'ButtonContainerDiv';

// tslint:disable:no-unused-expression
injectGlobal`
  .modal__close {
    display: none;
  }
  .modal__content {
    max-width: 34rem;
  }
`; // tslint:enable:no-unused-expression
