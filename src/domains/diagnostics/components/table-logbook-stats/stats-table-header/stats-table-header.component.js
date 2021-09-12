import React, { Component } from 'react';

import {
  FixedTableHeader,
  LocalizedText,
} from 'src/domains/diagnostics/components';

import { StatsTableRow, StatsTableCell, StatsTableCellBlock } from '..';

const topHeaderContents = ['Blood Glucose', 'Meal', 'Insulin'];
const topHeaderSpans = [4, 1, 5];
const dataColumns = [
  'Number of Tests',
  'Mean BG',
  'Standard Deviation',
  'Hypos',
  'Carbohydrates',
  'Insulin',
  'Basal',
  'Bolus',
  'Number of Boluses',
  'Basal/Bolus',
];
const dataColumnUnits = [
  null,
  'mg/dL',
  'mg/dl',
  null,
  'g',
  'U',
  'U',
  'U',
  null,
  '%',
];

const widthDataCells = '9%';

export class StatsTableHeader extends Component {
  render() {
    return (
      <FixedTableHeader width="100%">
        <StatsTableRow flex={1}>
          <StatsTableCell width={widthDataCells}>
            <LocalizedText textKey="graphs.logbook.date" />
          </StatsTableCell>
          {topHeaderContents.map((headerGroup, index) => (
            <StatsTableCell
              key={`stat groups label - ${headerGroup}-${index}`}
              borderBottom={{ thick: true }}
              colSpan={topHeaderSpans[index]}
              width={widthDataCells}
            >
              {headerGroup}
            </StatsTableCell>
          ))}
        </StatsTableRow>

        <StatsTableRow>
          <StatsTableCell width={widthDataCells} />
          {dataColumns.map((colName, index) => (
            <StatsTableCell
              key={`Stat Header Labels Cell - ${index}`}
              width={widthDataCells}
            >
              {colName}
              <StatsTableCellBlock>
                {dataColumnUnits[index]}
              </StatsTableCellBlock>
            </StatsTableCell>
          ))}
        </StatsTableRow>
      </FixedTableHeader>
    );
  }
}
