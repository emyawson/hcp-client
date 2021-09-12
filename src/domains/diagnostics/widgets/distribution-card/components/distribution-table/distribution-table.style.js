import styled from 'styled-components';

import { TableBody, weight } from 'src/domains/diagnostics/components';
import { fontSize } from 'src/domains/diagnostics/styles';

export const DistributionTableBody = styled(TableBody)`
  font-size: ${fontSize.p};
  font-weight: ${weight.semiBold};
`;
