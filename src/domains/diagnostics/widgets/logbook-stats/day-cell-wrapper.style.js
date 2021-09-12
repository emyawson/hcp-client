import styled from 'styled-components';

import { DAY_CELL_LABELS } from './logbook-stats.constants';

export const DayCellWrapper = styled.div`
  color: ${props =>
    props.label && props.label === DAY_CELL_LABELS.WEEKEND
      ? props.theme.colors.brandBlue
      : 'initial'};
`;

DayCellWrapper.displayName = 'DayCellWrapper';
