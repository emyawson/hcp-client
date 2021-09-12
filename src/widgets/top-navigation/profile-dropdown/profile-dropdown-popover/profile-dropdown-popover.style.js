import styled from 'styled-components';

import { transitions } from 'src/core';

export const SignOutLink = styled.a`
  display: flex;
  justify-content: flex-end;
  color: ${props => props.theme.colors.brandBlue};
  cursor: pointer;
  font-size: ${props => props.theme.fontSize.p};
  text-transform: capitalize;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  padding: ${props => props.theme.spacing.four} 0;
  margin: 0 ${props => props.theme.spacing.four};
  border-top: 1px solid ${props => props.theme.colors.silverMedium};
  transition: ${transitions.default};

  &:hover {
    text-decoration: underline;
  }

  &:active {
    color: ${props => props.theme.colors.brandBlueDark};
  }
`;
SignOutLink.displayName = 'SignOutLink';
