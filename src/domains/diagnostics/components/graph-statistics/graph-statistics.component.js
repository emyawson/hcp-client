import * as React from 'react';

import { LocalizedText } from 'src/domains/diagnostics/components';

import {
  GraphDetailBloodGlucose,
  GraphDetailTargetRanges,
  MetabolicStatisticsTests,
  MetabolicStatisticsBloodGlucose,
  MetabolicStatisticsIndexes,
} from './components';
import {
  Container,
  ListSectionsContainer,
  Title,
} from './graph-statistics.style';

const renderDefaultGraphStatistics = ({
  bloodGlucoseValues: {
    bloodGlucoseMean,
    bloodGlucoseStandardDeviation,
    testsPerDay,
  },
  targetRangesValues: {
    abovePercentage,
    belowPercentage,
    hypoglycaemiaNumber,
    hypoglycaemiaPercentage,
    targetBloodGlucoseMinimum,
    targetBloodGlucoseMaximum,
    withinPercentage,
  },
}) => (
  <React.Fragment>
    <Title>
      <LocalizedText textKey="graphDetails.statistics.statistics" />
    </Title>
    <ListSectionsContainer>
      <GraphDetailBloodGlucose
        bloodGlucoseMean={bloodGlucoseMean}
        bloodGlucoseStandardDeviation={bloodGlucoseStandardDeviation}
        testsPerDay={testsPerDay}
      />
      <GraphDetailTargetRanges
        abovePercentage={abovePercentage}
        belowPercentage={belowPercentage}
        hypoglycaemiaNumber={hypoglycaemiaNumber}
        hypoglycaemiaPercentage={hypoglycaemiaPercentage}
        targetBloodGlucoseMinimum={targetBloodGlucoseMinimum}
        targetBloodGlucoseMaximum={targetBloodGlucoseMaximum}
        withinPercentage={withinPercentage}
      />
    </ListSectionsContainer>
  </React.Fragment>
);

const renderMetabolicGraphStatistics = ({
  tests: { numberOfTests, testsPerDay, testsPerMeasuredDay },
  bloodGlucose: {
    mean,
    meanBeforeMeal,
    meanAfterMeal,
    stdDev,
    stdDevMeanRatio,
  },
  indexes: { hbgi, lbgi },
}) => (
  <React.Fragment>
    <Title>
      <LocalizedText textKey="graphDetails.statistics.statistics" />
    </Title>
    <ListSectionsContainer>
      <MetabolicStatisticsTests
        numberOfTests={numberOfTests}
        testsPerDay={testsPerDay}
        testsPerMeasuredDay={testsPerMeasuredDay}
      />
      <MetabolicStatisticsBloodGlucose
        mean={mean}
        meanAfterMeal={meanAfterMeal}
        meanBeforeMeal={meanBeforeMeal}
        stdDev={stdDev}
        stdDevMeanRatio={stdDevMeanRatio}
      />
      <MetabolicStatisticsIndexes hbgi={hbgi} lbgi={lbgi} />
    </ListSectionsContainer>
  </React.Fragment>
);

export const GraphStatistics = ({ graphType, graphDetails }) => (
  <Container>
    {graphType === 'metabolic'
      ? renderMetabolicGraphStatistics(graphDetails)
      : renderDefaultGraphStatistics(graphDetails)}
  </Container>
);
