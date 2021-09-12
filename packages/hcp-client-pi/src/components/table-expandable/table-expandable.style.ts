import { createStyledComponent, IThemeInterface } from '@roche/patterns-indicators/theme';
import { StyledComponentClass } from 'styled-components';

interface TableExpandableWrapperProps {
  collapsed: boolean;
}

export const TableExpandableWrapper: StyledComponentClass<
  TableExpandableWrapperProps,
  IThemeInterface
> = createStyledComponent<'div', TableExpandableWrapperProps>('div')`
  box-sizing: border-box;  
  border-radius: ${({ theme }) => theme.borderRadius[0]};
  box-shadow: ${({ collapsed, theme }) =>
    !collapsed
      ? theme.boxShadow({
          depth: 'two',
          color: theme.colors.black,
        })
      : null};
  overflow: hidden;
  margin-bottom: ${({ collapsed, theme }) =>
    collapsed ? theme.spacing.three : theme.spacing.four};
`;

TableExpandableWrapper.displayName = 'TableExpandableWrapper';

export const HeaderRow: StyledComponentClass<
  {},
  IThemeInterface
> = createStyledComponent<'div', {}>('div')`
  display: flex;
  justify-content: space-between;
`;

HeaderRow.displayName = 'HeaderRow';

interface HeaderTextProps {
  collapsed: boolean;
}
export const HeaderText: StyledComponentClass<
  HeaderTextProps,
  IThemeInterface
> = createStyledComponent<'div', HeaderTextProps>('div')`
  color: ${({ collapsed, theme }) =>
    collapsed ? theme.colors.charcoal : theme.colors.brandBlue};
  border: ${({ collapsed, theme }) =>
    collapsed ? `1px solid ${theme.colors.silverMedium}` : null};
  background-color: ${({ theme }) => theme.colors.silverLight};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 1.3rem;
  text-transform: uppercase;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.p};
`;

HeaderText.displayName = 'HeaderText';

type CaretIconDownDivProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const CaretIconDownDiv: StyledComponentClass<
  CaretIconDownDivProps,
  IThemeInterface
> = createStyledComponent<'div', CaretIconDownDivProps>('div')`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.brandBlue};
  padding: ${({ theme }) => theme.spacing.two};
`;

CaretIconDownDiv.displayName = 'CaretIconDownDiv';

export const CaretIconUpDiv: StyledComponentClass<
  CaretIconDownDivProps,
  IThemeInterface
> = CaretIconDownDiv.extend`
  background-color: ${({ theme }) => theme.colors.grayMedium};
  transform: scaleY(-1);
`;

CaretIconUpDiv.displayName = 'CaretIconUpDiv';

export const Table: StyledComponentClass<
  {},
  IThemeInterface
> = createStyledComponent<'table', {}>('table')`
  width: 100%; 
  border-collapse: collapse;
`;

Table.displayName = 'Table';

type TableCellProps = {
  rowIndex: number;
};

type StyledTableCell = StyledComponentClass<TableCellProps, IThemeInterface>;

export const TableCell: StyledTableCell = createStyledComponent<
  'td',
  TableCellProps
>('td')`
  border: ${({ theme }) => `1px solid ${theme.colors.silverMedium}`};
  background-color: ${({ rowIndex, theme }) =>
    rowIndex % 2 === 0 ? theme.colors.white : theme.colors.silverLight};
  padding: 1.3rem;
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.charcoal};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

TableCell.displayName = 'LeftTableCell';

export const LeftTableCell: StyledTableCell = TableCell.extend`
  width: 30%;
  min-width: 6rem;
  border-left: none;
`;

LeftTableCell.displayName = 'LeftTableCell';

export const RowTitle: StyledComponentClass<
  {},
  IThemeInterface
> = createStyledComponent<'div', {}>('div')``;

RowTitle.displayName = 'RowTitle';

export const Description: StyledComponentClass<
  {},
  IThemeInterface
> = createStyledComponent<'div', {}>('div')`
  font-size: ${({ theme }) => theme.fontSize.label};
  color: ${({ theme }) => theme.colors.grayDark};
`;

Description.displayName = 'Description';

export const RightTableCell: StyledTableCell = TableCell.extend`
  border-right: none;
`;

RightTableCell.displayName = 'RightTableCell';
