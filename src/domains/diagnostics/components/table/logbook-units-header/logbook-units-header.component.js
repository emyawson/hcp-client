import React from 'react';

import { LocalizedText } from 'src/domains/diagnostics/components';
import { colors } from 'src/domains/diagnostics/styles';

import {
  LogbookCellBlock,
  LogbookCellBlocksContainer,
  LogbookTableCell,
} from '..';

const BloodGlucoseCarbohydratesAndBolusCells = ({
  children,
  keyText,
  width,
}) => [
  <LogbookTableCell key={`${keyText}-cell`} p={1} width={width}>
    <LogbookCellBlocksContainer>
      {['mgPerDL', 'g', 'u'].map(unit => (
        <LogbookCellBlock
          key={`${keyText}-cell-${unit}-before`}
          flex="1"
          color={colors.blueMarine}
        >
          <LocalizedText textKey={`graphs.logbook.${unit}`} />
        </LogbookCellBlock>
      ))}
      {children}
    </LogbookCellBlocksContainer>
  </LogbookTableCell>,
];

const NightBedtimeHeader = ({ keyText }) => [
  <BloodGlucoseCarbohydratesAndBolusCells
    key={`${keyText}-nightbedtime`}
    keyText={keyText}
    width={'9rem'}
  />,
];
const BreakfastLunchDinnerHeader = ({ keyText }) => [
  <BloodGlucoseCarbohydratesAndBolusCells
    key={`${keyText}-bld`}
    width={'14.95rem'}
  >
    {['mgPerDL', 'u'].map(unit => (
      <LogbookCellBlock
        key={`${keyText}-cell-${unit}-after`}
        flex="1"
        color={colors.blueMarine}
      >
        <LocalizedText textKey={`graphs.logbook.${unit}`} />
      </LogbookCellBlock>
    ))}
  </BloodGlucoseCarbohydratesAndBolusCells>,
];

export const LogbookUnitsHeader = () => [
  <NightBedtimeHeader key="nightHeader" keyText="nightHeader" />,
  <BreakfastLunchDinnerHeader
    key="breakfastHeader"
    keyText="breakfastHeader"
  />,
  <BreakfastLunchDinnerHeader key="lunchHeader" keyText="lunchHeader" />,
  <BreakfastLunchDinnerHeader key="dinnerHeader" keyText="dinnerHeader" />,
  <NightBedtimeHeader key="bedtimeHeader" keyText="bedtimeHeader" />,
  <LogbookTableCell key="detailsHeader" p={1} />,
];
