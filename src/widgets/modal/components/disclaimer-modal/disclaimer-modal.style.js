import styled from 'styled-components';

import { colors, spacing } from 'src/core';
import { Block } from 'src/components';

export const Footer = styled.div`
  padding: ${spacing.three} ${spacing.four};
  background-color: ${colors.silverLight};
  border-top: 1px solid ${colors.grayLighter};
  border-bottom-left-radius: 0.1875rem;
  border-bottom-right-radius: 0.1875rem;
`;

export const ContentWrapper = Block.extend`
  max-height: 38rem;
  overflow-y: auto;

  & ul {
    margin-bottom: 0;
  }

  & ${Block}:not(:first-child) {
    border-top: 1px solid ${colors.grayLighter};
  }
`;
