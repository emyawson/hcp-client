import styled from 'styled-components';
import { fontSize } from 'styled-system';

import { weight } from 'src/domains/diagnostics/components/fonts/weights';

export const NoDataDisclaimerDiv = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  min-height: inherit;
  flex-direction: column;
  justify-content: center;
`;

export const NoDataP = styled.p`
  ${fontSize};
  font-weight: ${weight.semiBold};
`;
