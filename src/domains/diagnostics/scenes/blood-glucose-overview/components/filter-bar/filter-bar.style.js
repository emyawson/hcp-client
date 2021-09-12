import styled from 'styled-components';

import { spacing, borderRadius } from 'src/domains/diagnostics/styles';

export const FilterBarContainer = styled.div`
  padding: ${spacing.three} ${spacing.four};
  border-radius: ${borderRadius.six} ${borderRadius.six} 0 0;
  width: 100%;
  border-bottom: 1px solid lightgray;
`;
