import React from 'react';

import {
  FixedTableHeaderWithSpacing,
  weight,
} from 'src/domains/diagnostics/components';
import { colors } from 'src/domains/diagnostics/styles';
import { TABLE_HEADER_KEYS } from 'src/domains/diagnostics/constants';

import {
  LogbookTableRow,
  TableHeaderCell,
  LogbookDiaryTableSubheader,
} from '..';

const borderSpacing = 0.75;

const tableHeaders = [
  { key: TABLE_HEADER_KEYS.DATE, width: `${6.875 - borderSpacing * 1.5}rem` },
  { key: TABLE_HEADER_KEYS.TIME, width: `${3.8 - borderSpacing}rem` },
  { key: TABLE_HEADER_KEYS.BLOOD_GLUCOSE, width: `${11.1 - borderSpacing}rem` },
  { key: TABLE_HEADER_KEYS.CARBOHYDRATES, width: `${9 - borderSpacing}rem` },
  {
    key: TABLE_HEADER_KEYS.INSULIN,
    width: `${12 - borderSpacing}rem`,
    colspan: 3,
  },
  {
    key: TABLE_HEADER_KEYS.BASAL_RATE_PROFILE,
    width: `${8 - borderSpacing}rem`,
  },
  { key: TABLE_HEADER_KEYS.PUMP, width: `${8 - borderSpacing}rem`, colspan: 3 },
  { key: TABLE_HEADER_KEYS.NOTES, width: `${18 - borderSpacing}rem` },
];

export const LogbookDiaryTableHeader = () => (
  <FixedTableHeaderWithSpacing
    bg={colors.clear}
    marginLeft="-0.625rem"
    marginTop="-1.063rem"
  >
    <LogbookTableRow>
      {tableHeaders.map((header, i) => {
        const borderBottom =
          header.key === TABLE_HEADER_KEYS.DATE ||
          header.key === TABLE_HEADER_KEYS.TIME ||
          header.key === TABLE_HEADER_KEYS.NOTES
            ? null
            : { color: colors.blueMarine };

        return (
          <TableHeaderCell
            key={`logbook diary label header - ${header.key}-${i}`}
            keyText={i}
            headerKey={header.key}
            height="auto"
            width={header.width}
            colspan={header.colspan ? header.colspan : 1}
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
    <LogbookTableRow>
      <LogbookDiaryTableSubheader />
    </LogbookTableRow>
  </FixedTableHeaderWithSpacing>
);
