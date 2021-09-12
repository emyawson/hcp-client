import React from 'react';

import { LocalizedText } from 'src/domains/diagnostics/components';
import { translate } from 'src/i18n'; // TODO: move to diagnostics
import { withGraphLoader } from 'src/domains/diagnostics/utils';
import { SIZE } from 'src/domains/diagnostics/components/no-data-disclaimer';

import {
  BGCardContainer,
  BGTestsData,
  BGTestsContainer,
  BGRow,
  BGTestText,
  BGTestTextSmall,
  BGStatsContainer,
  BGData,
  BGTitle,
  BGUnits,
  BGDataPoint,
} from './bg-stats-card.style';

const BGCardContainerWithLoader = withGraphLoader(
  BGCardContainer,
  translate('general.loading'),
  { size: SIZE.SMALL },
);

export const BGStatsCard = ({
  numberOfTests,
  testsPerDay,
  bloodGlucoseMean,
  bgMeasurementUnit,
  bloodGlucoseStandardDeviation,
  isLoading,
  hasData,
}) => (
  <BGCardContainerWithLoader isLoading={isLoading} hasError={!hasData}>
    <BGRow>
      <BGTestsContainer>
        <BGTestsData>
          <BGTestText>{numberOfTests}</BGTestText>
          <BGTestTextSmall>
            <LocalizedText textKey="bloodGlucoseStats.numberOfTestsTitle" />
          </BGTestTextSmall>
        </BGTestsData>
      </BGTestsContainer>

      <BGTestsContainer>
        <BGTestsData>
          <BGTestText>{testsPerDay}</BGTestText>
          <BGTestTextSmall>
            <LocalizedText textKey="bloodGlucoseStats.testsPerDayTitle" />
          </BGTestTextSmall>
        </BGTestsData>
      </BGTestsContainer>
    </BGRow>

    <BGRow>
      <BGStatsContainer>
        <BGData>
          <BGDataPoint>{bloodGlucoseMean}</BGDataPoint>
          <BGUnits>{bgMeasurementUnit}</BGUnits>
        </BGData>
        <BGTitle>
          <LocalizedText
            textAlign="center"
            textKey="bloodGlucoseStats.meanBloodGlucoseTitle"
          />
        </BGTitle>
      </BGStatsContainer>

      <BGStatsContainer>
        <BGData>
          <BGDataPoint>{bloodGlucoseStandardDeviation}</BGDataPoint>
          <BGUnits>{bgMeasurementUnit}</BGUnits>
        </BGData>
        <BGTitle>
          <LocalizedText textKey="bloodGlucoseStats.standardDevTitle" />
        </BGTitle>
      </BGStatsContainer>
    </BGRow>
  </BGCardContainerWithLoader>
);
