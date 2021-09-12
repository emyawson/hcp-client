import styled from 'styled-components';

import { colors, spacing } from 'src/domains/diagnostics/styles';

export const PagerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5.625rem;
  padding-right: ${spacing.four};
  border-bottom: 1px solid lightgray;
`;

PagerWrapper.displayName = 'PagerWrapper';

export const PagerButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background: ${colors.white};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;

PagerButton.displayName = 'PagerButton';
