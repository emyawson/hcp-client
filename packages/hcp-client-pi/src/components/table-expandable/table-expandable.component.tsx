import * as React from 'react';

import { ArrowIcon } from '@roche/patterns-indicators/assets/icons/arrow-icon';
import { RenderIf } from '@roche/patterns-indicators/utils/markup/render-if.utils';

import {
  CaretIconDownDiv,
  CaretIconUpDiv,
  Description,
  HeaderRow,
  HeaderText,
  LeftTableCell,
  RightTableCell,
  RowTitle,
  Table,
  TableExpandableWrapper,
} from './table-expandable.style';

interface TableExpandableProps {
  collapsed: boolean;
  tableData: Array<{ col1: { title: string; description: string }; col2: any }>;
  tableId: string;
  tableName: string;
  toggleTable: (string) => void;
}

export const TableExpandable = ({
  collapsed,
  tableId,
  toggleTable,
  tableData,
  tableName,
}: TableExpandableProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    toggleTable(tableId);

  const renderTableRows = data =>
    data.map((rowData, index) => (
      <tr key={`${rowData.col1}-${index}`}>
        <LeftTableCell rowIndex={index}>
          <RowTitle>{rowData.col1.title}</RowTitle>
          <Description>{rowData.col1.description}</Description>
        </LeftTableCell>
        <RightTableCell rowIndex={index}>{rowData.col2}</RightTableCell>
      </tr>
    ));

  return (
    <TableExpandableWrapper collapsed={collapsed}>
      <HeaderRow>
        <HeaderText collapsed={collapsed}>{tableName}</HeaderText>
        <RenderIf validate={collapsed}>
          <CaretIconDownDiv onClick={handleClick}>
            <ArrowIcon fillColor="white" height={7} />
          </CaretIconDownDiv>
        </RenderIf>
        <RenderIf validate={!collapsed}>
          <CaretIconUpDiv onClick={handleClick}>
            <ArrowIcon fillColor="white" height={7} />
          </CaretIconUpDiv>
        </RenderIf>
      </HeaderRow>
      <RenderIf validate={!collapsed}>
        <Table>
          <tbody>{renderTableRows(tableData)}</tbody>
        </Table>
      </RenderIf>
    </TableExpandableWrapper>
  );
};
