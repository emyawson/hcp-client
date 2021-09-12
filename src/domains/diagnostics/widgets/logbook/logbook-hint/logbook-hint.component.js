import React from 'react';
import { isNil } from 'ramda';

import {
  AppleIcon,
  CircleMarkIcon,
  AppleEatenIcon,
} from 'src/domains/diagnostics/assets/icons';
import { colors } from 'src/domains/diagnostics/styles';
import { RenderIf } from 'src/domains/diagnostics/utils';
import { LOGBOOK_STATUS_COLOR } from 'src/domains/diagnostics/constants';
import { LocalizedText } from 'src/domains/diagnostics/components';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import {
  ContainerDiv,
  Header,
  GrayMediumLabel,
  Row,
  InnerRow,
  Column,
  SmallerLabel,
  GraySmallLabel,
  MediumLabel,
  LargeLabel,
  LightGraySmallLabel,
} from './logbook-hint.style';

const mealIconSetting = {
  height: 14,
  width: 14,
  borderFillColor: 'transparent',
  withBorder: true,
};

const getStatusIconSetting = statusColor => {
  const colorMap = {
    [LOGBOOK_STATUS_COLOR.TRANSPARENT]: colors.clear,
    [LOGBOOK_STATUS_COLOR.GREEN]: colors.trafficGreen,
    [LOGBOOK_STATUS_COLOR.BLUE]: colors.blueMarine,
    [LOGBOOK_STATUS_COLOR.RED]: colors.red,
  };

  const color = colorMap[statusColor];

  return {
    height: 7,
    width: 7,
    fillColor: color,
    strokeColor: color,
  };
};

const unitToString = unit => `${unit.value} `;

const HintRow = ({
  glucose,
  bolus,
  carbohydrates,
  time,
  afterMeal,
  beforeMeal,
  statusColor,
}) => (
  <Row>
    <InnerRow pb={2}>
      <Column>
        <SmallerLabel>{time}</SmallerLabel>
      </Column>
      <Column>
        <RenderIf validate={beforeMeal}>
          <AppleIcon {...mealIconSetting} />
        </RenderIf>
        <RenderIf validate={afterMeal}>
          <AppleEatenIcon {...mealIconSetting} />
        </RenderIf>
      </Column>
    </InnerRow>
    <InnerRow>
      <Column>
        <CircleMarkIcon
          {...getStatusIconSetting(
            !isNil(glucose.value)
              ? statusColor
              : LOGBOOK_STATUS_COLOR.TRANSPARENT,
          )}
        />
        <MediumLabel pl={3}>
          {!isNil(glucose.value)
            ? unitToString(glucose)
            : `${EMPTY_VALUE_PLACEHOLDER} `}
          <LocalizedText textKey={glucose.unit} />
        </MediumLabel>
      </Column>
      <Column>
        <RenderIf validate={!isNil(carbohydrates.value)}>
          <GraySmallLabel>
            {unitToString(carbohydrates)}
            <LocalizedText textKey={carbohydrates.unit} />
          </GraySmallLabel>
        </RenderIf>
        <RenderIf validate={!isNil(carbohydrates.value) && !isNil(bolus.value)}>
          <LightGraySmallLabel pl={2} pr={2}>
            |
          </LightGraySmallLabel>
        </RenderIf>
        <RenderIf validate={!isNil(bolus.value)}>
          <GraySmallLabel>
            {unitToString(bolus)}
            <LocalizedText textKey={bolus.unit} />
          </GraySmallLabel>
        </RenderIf>
      </Column>
    </InnerRow>
  </Row>
);

const renderHintsDataRows = measurements =>
  measurements.map((measurement, index) => (
    <HintRow key={`mealtime measurement ${index}`} {...measurement} />
  ));

export const LogbookHint = ({ mealTimeName, date, measurements }) => (
  <ContainerDiv>
    <Header>
      <Column>
        <LargeLabel>
          <LocalizedText textKey={mealTimeName} />
        </LargeLabel>
      </Column>
      <Column>
        <GrayMediumLabel>{date}</GrayMediumLabel>
      </Column>
    </Header>
    {renderHintsDataRows(measurements)}
  </ContainerDiv>
);
