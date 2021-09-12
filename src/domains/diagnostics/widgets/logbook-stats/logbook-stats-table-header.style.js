import styled from 'styled-components';
import { flex, space } from 'styled-system';

import { spacing } from 'src/domains/diagnostics/styles';
import { combineRems } from 'src/domains/diagnostics/utils';

import { dayColumnStyle } from './day-column.style';
import { Cell } from './cell.style';
import { Column } from './column.style';

import { getBorder } from '../../utils/border';

export const LogbookStatsTableHeaderWrapper = styled.div`
  min-width: ${props => props.minWidth || null};
  height: ${props => (props.height ? `${props.height}rem` : null)};
  padding-bottom: ${props =>
    props.paddingBottom ? `${props.paddingBottom}rem` : null};
  padding: 0 ${spacing.two};
`;

export const HeaderColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0;
`;

HeaderColumn.displayName = 'HeaderColumn';

export const HeaderColumnInner = styled(HeaderColumn)`
  padding: 0 ${spacing.two};
`;

HeaderColumn.displayName = 'HeaderColumnInner';

export const HeaderDayColumn = styled(HeaderColumn)`
  ${dayColumnStyle};
  @media all and (-ms-high-contrast: none) {
    min-width: 4.7rem;
  }
`;

HeaderDayColumn.displayName = 'HeaderDayColumn';

export const HeaderCell = styled(Cell)`
  font-size: ${props => props.theme.fontSize.p};
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  color: ${props => props.theme.colors.blueMarine};
  font-weight: ${props =>
    props.bold ? props.theme.fontWeights.bold : 'inherit'};
  border-bottom: ${props =>
    props.borderBottom ? getBorder(props.borderBottom) : 'none'};
  margin: 0;
  ${space};
  @media all and (-ms-high-contrast: none) {
    flex-basis: auto;
    min-height: ${combineRems(spacing.three, spacing.four)};
  }
`;

HeaderCell.displayName = 'HeaderCell';

export const Row = styled.div`
  flex: 1;
  ${flex};
  display: flex;
  width: 100%;
  @media all and (-ms-high-contrast: none) {
    flex-basis: auto;
  }
`;

Row.displayName = 'Row';

export const CaretWrapper = styled.div``;

CaretWrapper.displayName = 'CaretWrapper';

export const DateWrapper = styled.div`
  display: flex;

  & span {
    padding: 0 ${spacing.three} 0 ${spacing.two};
  }
`;

DateWrapper.displayName = 'DateWrapper';
