import React from 'react';

import { withGraphLoader } from 'src/domains/diagnostics/utils';
import { translate } from 'src/i18n';
import { SIZE } from 'src/domains/diagnostics/components/no-data-disclaimer';

import {
  DistributionCardWrapper,
  DistributionCardStatsWrapper,
  DistributionGraphWrapper,
} from './distribution-card.style';
import { DistributionTable } from './components';

import { StackedRadialChart } from '../../components';

const DistributionCardWrapperWithLoader = withGraphLoader(
  DistributionCardWrapper,
  translate('general.loading'),
  { size: SIZE.SMALL },
);

export const DistributionCard = ({
  distribution,
  distributionSegments,
  threshold,
  isLoading,
  hasData,
}) => (
  <DistributionCardWrapperWithLoader isLoading={isLoading} hasError={!hasData}>
    <DistributionGraphWrapper>
      <StackedRadialChart diameter={100} segments={distributionSegments} />
    </DistributionGraphWrapper>
    <DistributionCardStatsWrapper>
      <DistributionTable distribution={distribution} threshold={threshold} />
    </DistributionCardStatsWrapper>
  </DistributionCardWrapperWithLoader>
);
