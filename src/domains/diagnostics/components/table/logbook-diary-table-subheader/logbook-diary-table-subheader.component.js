import React from 'react';

import { LocalizedText } from 'src/domains/diagnostics/components';
import { colors, fontSize } from 'src/domains/diagnostics/styles';
import {
  PumpProfileChangeIcon,
  PumpRunIcon,
  PumpStopIcon,
} from 'src/domains/diagnostics/assets/icons';

import { LogbookTableCell } from '..';

const SubheaderCells = ({
  children,
  color,
  fontSize,
  keyText,
  paddingLeft,
  textAlign,
}) => [
  <LogbookTableCell
    key={`${keyText}-cell`}
    p={1}
    fontSize={fontSize}
    textAlign={textAlign}
    paddingLeft={paddingLeft}
    color={color}
    height="auto"
  >
    {children}
  </LogbookTableCell>,
];

const DateHeader = ({ keyText, color }) => [
  <SubheaderCells key={`${keyText}-date`} color={color} />,
];

const TimeHeader = ({ keyText, color }) => [
  <SubheaderCells key={`${keyText}-time`} color={color} />,
];

const BloodGlucoseUnitHeader = ({ color, fontSize, keyText, children }) => (
  <SubheaderCells
    key={`${keyText}-unit`}
    textAlign="left"
    fontSize={fontSize}
    color={color}
  >
    {children}
  </SubheaderCells>
);

const CarbsHeader = ({ keyText, color, fontSize, children }) => [
  <SubheaderCells
    key={`${keyText}-time`}
    color={color}
    fontSize={fontSize}
    children={children}
  />,
];

const InsulinHeader = ({ children, color, fontSize, keyText, textAlign }) =>
  children.map((child, i) => (
    <SubheaderCells
      key={`${keyText}-unit-${i}`}
      textAlign={textAlign}
      fontSize={fontSize}
      color={color}
    >
      {child}
    </SubheaderCells>
  ));

const BasalRateHeader = ({ keyText, color }) => [
  <SubheaderCells key={`${keyText}-time`} color={color} />,
];

const PumpHeader = ({ children, keyText, color, textAlign }) =>
  children.map((child, i) => (
    <SubheaderCells
      key={`${keyText}-icon-${i}`}
      color={color}
      textAlign={textAlign}
    >
      {child}
    </SubheaderCells>
  ));

const NotesHeader = ({ keyText, color }) => [
  <SubheaderCells key={`${keyText}-time`} color={color} />,
];

export const LogbookDiaryTableSubheader = () => [
  <DateHeader key="dateHeader" color={colors.blueMarine} />,
  <TimeHeader key="timeHeader" color={colors.blueMarine} />,
  <BloodGlucoseUnitHeader
    key="bgUnitHeader"
    fontSize={fontSize.caption}
    color={colors.blueMarine}
  >
    {<LocalizedText textKey="graphs.logbookDiary.mgPerDL" />}
  </BloodGlucoseUnitHeader>,
  <CarbsHeader
    key="carbsHeader"
    textAlign="center"
    fontSize={fontSize.caption}
    color={colors.blueMarine}
  >
    {<LocalizedText textKey="graphs.logbookDiary.grams" />}
  </CarbsHeader>,
  <InsulinHeader
    key="insulinHeader"
    textAlign="center"
    fontSize={fontSize.caption}
    color={colors.blueMarine}
  >
    {[1, 2, 3]}
  </InsulinHeader>,
  <BasalRateHeader key="basalRateHeader" color={colors.blueMarine} />,
  <PumpHeader key="pumpHeader" color={colors.blueMarine} textAlign="center">
    <PumpProfileChangeIcon width={17} />
    <PumpRunIcon width={17} />
    <PumpStopIcon width={17} />
  </PumpHeader>,
  <NotesHeader key="notesHeader" color={colors.blueMarine} />,
];
