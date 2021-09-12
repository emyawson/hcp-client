import styled from 'styled-components';

import { spacing } from 'src/domains/diagnostics/styles';

export const StatusCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing.three} ${spacing.three} ${spacing.two};
`;

StatusCardWrapper.displayName = 'StatusCardWrapper';
