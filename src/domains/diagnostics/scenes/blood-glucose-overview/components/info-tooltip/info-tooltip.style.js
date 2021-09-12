import styled from 'styled-components';

import { spacing } from 'src/domains/diagnostics/styles';

export const InfoTooltipContainer = styled.div`
  position: relative;
`;

InfoTooltipContainer.displayName = 'InfoTooltipContainer';

export const TooltipContainer = styled.div`
  padding: ${spacing.three};
`;

TooltipContainer.displayName = 'TooltipContainer';
