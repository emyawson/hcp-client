import styled from 'styled-components';

import { spacing } from 'src/domains/diagnostics/styles';

export const DistributionCardWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 1.125rem ${spacing.three};

  svg {
    max-width: 12rem;
  }
`;

DistributionCardWrapper.displayName = 'DistributionCardWrapper';

export const DistributionCardStatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 2;
  margin-left: ${spacing.three};
`;

DistributionCardStatsWrapper.displayName = 'DistributionCardStatsWrapper';

export const DistributionGraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

DistributionGraphWrapper.displayName = 'DistributionGraphWrapper';
