import styled from 'styled-components';

import { colors } from 'src/domains/diagnostics/styles';

export const DayLinesList = styled.ul`
  list-style: none;
  padding: 0 0.5rem;
  margin: 0;
  text-align: left;
  color: ${props => (props.isWeekendDay ? colors.blue : colors.black)};
`;

DayLinesList.displayName = 'DayLinesList';
