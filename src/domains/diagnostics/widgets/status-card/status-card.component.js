import React from 'react';

import { translate } from 'src/i18n';
import { withGraphLoader } from 'src/domains/diagnostics/utils';
import { SIZE } from 'src/domains/diagnostics/components/no-data-disclaimer';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import { StatusCardRow } from './components';
import { StatusCardWrapper } from './status-card.style';

const StatusCardWrapperWithLoader = withGraphLoader(
  StatusCardWrapper,
  translate('general.loading'),
  { size: SIZE.SMALL },
);

export const StatusCard = ({
  hasReliableInfo,
  hypoRisk,
  meanBloodGlucose,
  placeholderStatusLabel,
  showPlaceholderStatusLabelAndHideValues,
  showStatusLabels,
  threshold: { glucoseIdealIntervalMin, glucoseIdealIntervalMax },
  variability,
  isLoading,
  hasData,
}) => {
  const hypoRiskStatusLabel = `${hypoRisk.status.label} ${translate(
    'dashboard.statusCard.hypoRisk',
  )}`;
  const meanBloodGlucoseStatusLabel = `${translate(
    'dashboard.statusCard.meanBloodGlucose',
  )} ${meanBloodGlucose.status.label}`;
  const variabilityStatusLabel = `${variability.status.label} ${translate(
    'dashboard.statusCard.variability',
  )}`;

  return (
    <StatusCardWrapperWithLoader isLoading={isLoading} hasError={!hasData}>
      <StatusCardRow
        color={hypoRisk.status.color}
        hasReliableInfo={hasReliableInfo}
        showLabels={showStatusLabels}
        statusLabel={
          showPlaceholderStatusLabelAndHideValues
            ? placeholderStatusLabel
            : hypoRiskStatusLabel
        }
        value={
          showPlaceholderStatusLabelAndHideValues
            ? EMPTY_VALUE_PLACEHOLDER
            : hypoRisk.value.lbgi
        }
      />
      <StatusCardRow
        caption={`(${translate(
          'dashboard.statusCard.targetRange',
        )}: ${glucoseIdealIntervalMin}-${glucoseIdealIntervalMax} ${translate(
          'general.units.mgPerDL',
        )})`}
        color={meanBloodGlucose.status.color}
        hasReliableInfo={hasReliableInfo}
        showLabels={showStatusLabels}
        statusLabel={
          showPlaceholderStatusLabelAndHideValues
            ? placeholderStatusLabel
            : meanBloodGlucoseStatusLabel
        }
        value={
          showPlaceholderStatusLabelAndHideValues
            ? EMPTY_VALUE_PLACEHOLDER
            : `${meanBloodGlucose.value} ${translate('general.units.mgPerDL')}`
        }
      />
      <StatusCardRow
        color={variability.status.color}
        hasReliableInfo={hasReliableInfo}
        showLabels={showStatusLabels}
        statusLabel={
          showPlaceholderStatusLabelAndHideValues
            ? placeholderStatusLabel
            : variabilityStatusLabel
        }
        value={
          showPlaceholderStatusLabelAndHideValues
            ? EMPTY_VALUE_PLACEHOLDER
            : variability.value
        }
      />
    </StatusCardWrapperWithLoader>
  );
};
