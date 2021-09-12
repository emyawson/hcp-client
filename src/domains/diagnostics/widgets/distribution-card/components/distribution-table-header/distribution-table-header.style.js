import styled from 'styled-components';

import { TableHeader, weight } from 'src/domains/diagnostics/components';
import { fontSize } from 'src/domains/diagnostics/styles';

export const DistributionTableHeaderWrapper = styled(TableHeader)`
  font-size: ${fontSize.subheading};
  font-weight: ${weight.semiBold};
`;
