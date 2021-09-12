import React, { Component } from 'react';

import { StatsTableRow, StatsTableCell } from '..';

import { FixedTableBody } from 'src/domains/diagnostics/components';
import { convertMillis, toFormat } from 'src/domains/diagnostics/utils';

import { randomDateGenerator, randomIntFromInterval } from '../../../utils';

const randomValue = () => randomIntFromInterval(1, 79);

const mockData = [...Array(100)].map(item => [
  toFormat('ccc, LLL dd yyyy')(
    convertMillis(randomDateGenerator(new Date(2016, 0, 1), new Date())),
  ),
  randomValue(), // number of tests
  randomValue(), // mean BG
  randomValue(), // StdDev
  randomValue(), // Hypos
  randomValue(),
  randomValue(),
  randomValue(),
  randomValue(),
  randomValue(),
  `${randomValue()}/${randomValue()}`,
]);

const comparator = (a, b) => {
  if (new Date(a[0]) < new Date(b[0])) return -1;
  if (new Date(a[0]) > new Date(b[0])) return 1;
  return 0;
};

const mockDataSortedByDate = mockData.sort(comparator);
const widthDataCells = '9%';

export class StatsTableBody extends Component {
  render() {
    return (
      <FixedTableBody height="25rem" width="100%">
        {mockDataSortedByDate.map((row, index) => (
          <StatsTableRow key={`LogbookStatsRow - ${index}`}>
            {row.map((datapoint, dpindex) => (
              <StatsTableCell
                paddingLeft="1px"
                width={widthDataCells}
                alternateFill={index % 2}
                highlightDate={
                  dpindex === 0 &&
                  (datapoint.slice(0, 3) === 'Sat' ||
                    datapoint.slice(0, 3) === 'Sun')
                }
                key={`LogbookStatsDataPoint - ${dpindex}`}
              >
                {datapoint}
              </StatsTableCell>
            ))}
          </StatsTableRow>
        ))}
      </FixedTableBody>
    );
  }
}
