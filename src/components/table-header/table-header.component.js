import styled from 'styled-components';
import { space, fontSize, color, width } from 'styled-system';

export const TableHeader = styled.thead`
  ${width};
  ${color};
  ${space};
  ${fontSize};
`;

export const FixedTableHeader = TableHeader.extend`
  display: block;
  overflow: hidden;
`;

export const FixedTableHeaderWithSpacing = FixedTableHeader.extend`
  display: block;
  overflow: hidden;
  margin-left: ${props => props.marginLeft};
  margin-top: ${props => props.marginTop};
`;
