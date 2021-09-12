import styled from 'styled-components';
import { space } from 'styled-system';

export const TableBody = styled.tbody`
  ${space};
`;

export const FixedTableBody = styled.tbody`
  ${space};
  display: block;
  overflow: auto;
  height: ${props => props.height};
  width: ${props => props.width};
`;
