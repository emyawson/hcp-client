import React from 'react';

import { TableAltRowEven } from 'src/domains/diagnostics/components';
import { colors, fontSize } from 'src/domains/diagnostics/styles';

import {
  DataCell,
  DataCellsContainer,
  TitleList,
} from './blood-glucose-overview-table-row.style';

import { BloodGlucoseOverviewTableCell } from '../blood-glucose-overview-table-cell';
import { padArrayWithValue } from '../../utils/array-pad';

export const BloodGlucoseOverviewTableRow = ({
  borderBottom = false,
  data = [],
  height,
  renderCell = data => data,
  rowNumber = 0,
  width,
  bodyFontSize,
  titleLines = [],
  textColor,
}) => (
  <TableAltRowEven>
    <BloodGlucoseOverviewTableCell
      borderBottom={borderBottom}
      borderRight={{ color: colors.silver, size: '0.125rem', thick: true }}
      color={textColor}
      height={height}
      width={width}
      fontSize={fontSize.p}
      moveContentToTop
      pl={14}
      pr={14}
    >
      <TitleList>
        {titleLines.map((titleLine, index) => (
          <li key={`BGO row ${rowNumber} title line ${index}`}>{titleLine}</li>
        ))}
      </TitleList>
    </BloodGlucoseOverviewTableCell>
    <BloodGlucoseOverviewTableCell
      borderBottom={borderBottom}
      fontSize={bodyFontSize}
      pr={90}
    >
      <DataCellsContainer>
        {padArrayWithValue(data, 6, null).map((datum, index) => (
          <DataCell
            color={textColor}
            key={`BGO row ${rowNumber} cell ${index}`}
          >
            {renderCell(datum)}
          </DataCell>
        ))}
      </DataCellsContainer>
    </BloodGlucoseOverviewTableCell>
  </TableAltRowEven>
);
