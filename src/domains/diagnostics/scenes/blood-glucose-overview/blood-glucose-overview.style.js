import styled from 'styled-components';

import {
  spacing,
  colors,
  borderRadius,
  boxShadow,
} from 'src/domains/diagnostics/styles';

export const BloodGlucoseOverviewFlexibleHeightCard = styled.div`
  background: ${colors.blueMarineAlpha};
  margin-bottom: ${spacing.four};
  border: 1px solid ${colors.silverMedium};
  border-radius: ${borderRadius.six};
  box-shadow: ${boxShadow()};
`;

export const BloodGlucoseOverviewMainCardHeader = styled.div`
  background: ${colors.white};
  box-shadow: ${boxShadow()};
  border-radius: ${borderRadius.six} ${borderRadius.six} 0 0;
`;

export const BloodGlucoseOverviewSubCard = styled.div`
  background: ${colors.white};
  margin: ${spacing.four};
  border-radius: ${borderRadius.six};
  box-shadow: ${boxShadow()};
`;
