import styled from 'styled-components';

export const Cell = styled.div`
  flex: 1;
  font-size: ${props => props.theme.fontSize.caption};
  padding: ${props => props.theme.spacing.two} 0;
  text-align: ${props => props.textAlign || 'center'};
  margin: auto 0;
`;

Cell.displayName = 'Cell';
