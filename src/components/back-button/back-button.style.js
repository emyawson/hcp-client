import styled from 'styled-components';

export const ArrowLeftSpan = styled.span`
  transform: rotate(90deg);
  display: inline-block;
`;

export const BackButtonContainerDiv = styled.div`
  padding-right: ${props => props.theme.spacing.two};
  display: inline-block;
`;

ArrowLeftSpan.displayName = 'ArrowLeftSpan';
