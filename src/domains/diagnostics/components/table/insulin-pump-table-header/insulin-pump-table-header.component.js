import React from 'react';

import { TableHeader, weight } from 'src/domains/diagnostics/components';
import { colors } from 'src/domains/diagnostics/styles';
import { INSULIN_PUMP_TABLE_HEADER_KEYS } from 'src/domains/diagnostics/constants';

import { LogbookTableRow, TableHeaderCell } from '..';

const borderSpacing = 0.75;

const tableHeaders = [
  {
    key: INSULIN_PUMP_TABLE_HEADER_KEYS.DATE,
    width: `${6.875 - borderSpacing * 1.5}rem`,
  },
  {
    key: INSULIN_PUMP_TABLE_HEADER_KEYS.TIME,
    width: `${3.8 - borderSpacing}rem`,
  },
  { key: INSULIN_PUMP_TABLE_HEADER_KEYS.U, width: `${3.8 - borderSpacing}rem` },
  {
    key: INSULIN_PUMP_TABLE_HEADER_KEYS.TYPE,
    width: `${3.8 - borderSpacing}rem`,
  },
  {
    key: INSULIN_PUMP_TABLE_HEADER_KEYS.COMMENTS,
    width: '100%',
  },
];

export const InsulinPumpTableHeader = () => (
  <TableHeader bg={colors.clear}>
    <LogbookTableRow flex={1}>
      {tableHeaders.map((header, i) => {
        const borderBottom = { color: colors.blueMarine };

        return (
          <TableHeaderCell
            key={`logbook diary label header - ${header.key}-${i}`}
            keyText={i}
            headerKey={header.key}
            height="auto"
            width={header.width}
            colspan={1}
            noFill
            noTopBorder
            noRightBorder
            borderBottom={borderBottom}
            color={colors.blueMarine}
            textTransform="uppercase"
            fontWeight={weight.bold}
            verticalAlign="top"
            overflow="visible"
            padding="0"
            whiteSpace="normal"
            textAlign="left"
          />
        );
      })}
    </LogbookTableRow>
  </TableHeader>
);
