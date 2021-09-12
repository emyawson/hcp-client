import React from 'react';

import { StackedRadialChart } from 'src/domains/diagnostics/components';
import { colors } from 'src/domains/diagnostics/styles';
import { translate } from 'src/i18n'; // TODO: move to diagnostics
import {
  RadialChartContainerDiv,
  RadialChartBlockDiv,
  DetailRow,
} from 'src/domains/diagnostics/scenes/insulin/insulin.style';
import { DetailBlock } from 'src/domains/diagnostics/scenes/insulin/components';
import { formatDecimalAsPercentage } from 'src/domains/diagnostics/scenes/insulin/utils';
import { withGraphLoader } from 'src/domains/diagnostics/utils/with-graph-loader';

const DetailRowWithLoader = withGraphLoader(
  DetailRow,
  translate('graphs.insulin.loading'),
);

export const InsulinDetails = ({
  avgBolusBasalPerDay,
  avgBolusBasalPerDaySegments,
  hasNoData,
  isLoading,
}) => {
  const { totalAvg, totalBolusAvg, totalBasalAvg } = avgBolusBasalPerDay;

  return (
    <DetailRowWithLoader isLoading={isLoading} hasError={hasNoData}>
      <RadialChartBlockDiv>
        <RadialChartContainerDiv>
          <StackedRadialChart
            diameter={10}
            segments={avgBolusBasalPerDaySegments}
          />
        </RadialChartContainerDiv>
      </RadialChartBlockDiv>
      <DetailBlock
        flex={1}
        primaryTitle={translate('graphs.insulin.bolus')}
        secondaryTitle={`${totalBolusAvg.toFixed(2)} U/day`}
        value={formatDecimalAsPercentage(totalBolusAvg / totalAvg)}
        circleFill={colors.blueVeryLight}
      />
      <DetailBlock
        flex={1}
        primaryTitle={translate('graphs.insulin.basalInsulin')}
        secondaryTitle={`${totalBasalAvg.toFixed(2)} U/day`}
        value={formatDecimalAsPercentage(totalBasalAvg / totalAvg)}
        circleFill={colors.blueMarine}
      />
      <DetailBlock
        flex={2}
        primaryTitle={translate('graphs.insulin.totalInsulin')}
        value={`${totalAvg.toFixed(2)} U/day`}
      />
    </DetailRowWithLoader>
  );
};
