import React from 'react';

import { translate } from 'src/i18n'; // TODO: move to diagnostics

import {
  ContainerDiv,
  ColorIndicatorSpan,
  HelpButton,
  HelpRowDiv,
  HintIconCircle,
  HintRowDiv,
  NumOfTestsRowDiv,
  NumOfTestsSpan,
  NumOfTestsTitleSpan,
  StatColumnDiv,
  StatDiv,
  StatNumSpan,
  StatTitleDiv,
  StatUnitSpan,
  TopBarDiv,
} from './trend-tool-tip.style';

export const TrendToolTip = ({
  max,
  min,
  mean,
  numMeasurements,
  stDev,
  icon,
  meanColor,
  maxColor,
  minColor,
  unit = translate('general.units.mgPerDL'),
}: Props) => (
  <ContainerDiv>
    <TopBarDiv color={meanColor} />
    {icon && (
      <HintRowDiv>
        <HintIconCircle>{icon}</HintIconCircle>
      </HintRowDiv>
    )}
    <NumOfTestsRowDiv>
      <NumOfTestsTitleSpan>
        {translate('graphs.trendGraph.toolTip.numberOfTests')}
      </NumOfTestsTitleSpan>
      <NumOfTestsSpan>{numMeasurements}</NumOfTestsSpan>
    </NumOfTestsRowDiv>
    <HintRowDiv>
      <StatColumnDiv>
        <StatDiv>
          <StatTitleDiv>
            {translate('graphs.trendGraph.toolTip.highestResult')}
          </StatTitleDiv>
          <ColorIndicatorSpan color={maxColor} />
          <StatNumSpan>{max}</StatNumSpan>
          <StatUnitSpan>{unit}</StatUnitSpan>
        </StatDiv>
        <StatDiv>
          <StatTitleDiv>
            {translate('graphs.trendGraph.toolTip.standardDeviation')}
          </StatTitleDiv>
          <StatNumSpan>{stDev}</StatNumSpan>
          <StatUnitSpan>{unit}</StatUnitSpan>
        </StatDiv>
      </StatColumnDiv>
      <StatColumnDiv>
        <StatDiv>
          <StatTitleDiv>
            {translate('graphs.trendGraph.toolTip.lowestResult')}
          </StatTitleDiv>
          <ColorIndicatorSpan color={minColor} />
          <StatNumSpan>{min}</StatNumSpan>
          <StatUnitSpan>{unit}</StatUnitSpan>
        </StatDiv>
        <StatDiv>
          <StatTitleDiv>
            {translate('graphs.trendGraph.toolTip.mean')}
          </StatTitleDiv>
          <ColorIndicatorSpan color={meanColor} />
          <StatNumSpan>{mean}</StatNumSpan>
          <StatUnitSpan>{unit}</StatUnitSpan>
        </StatDiv>
      </StatColumnDiv>
    </HintRowDiv>
    <HelpRowDiv>
      <HelpButton>?</HelpButton>
    </HelpRowDiv>
  </ContainerDiv>
);
