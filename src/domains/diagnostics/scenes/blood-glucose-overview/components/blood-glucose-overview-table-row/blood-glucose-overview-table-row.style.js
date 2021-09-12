import styled from 'styled-components';

import { colors } from 'src/domains/diagnostics/styles';

export const TitleList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const DataCellsContainer = styled.div`
  display: flex;
`;

export const DataCell = styled.div`
  color: ${props => (props.color ? props.color : colors.black)};
  flex: 1;
  text-align: center;
`;
