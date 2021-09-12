import styled from 'styled-components';

import { LogbookRowCard } from '../../components/table/logbook-row-card';

export const Row = styled(LogbookRowCard)`
  margin: ${props => props.theme.spacing[2]} 0;
  flex: 1;
`;

Row.displayName = 'Row';
