import styled from 'styled-components';
import { flex, space } from 'styled-system';

export const Column = styled.div`
  flex: 1;
  ${flex};
  flex-basis: 0;
  display: flex;
  padding: ${props => props.theme.spacing.two};
  ${space};
  border-left: 0.0625rem solid ${props => props.theme.colors.silverDark};
  &:first-child {
    border-left: none;
  }
`;

Column.displayName = 'Column';

export const StripedColumn = styled(Column)`
  &:nth-child(even) {
    background-color: ${props => props.theme.colors.silverLight};
  }
`;

Column.displayName = 'StripedColumn';
