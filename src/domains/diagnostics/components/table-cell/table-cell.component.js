import styled from 'styled-components';
import { space, fontSize, color, width, textAlign } from 'styled-system';

export const TableCell = styled.td.attrs({
  colSpan: props => props.colSpan,
})`
  ${width};
  ${color};
  ${space};
  ${fontSize};
  ${textAlign};
`;
