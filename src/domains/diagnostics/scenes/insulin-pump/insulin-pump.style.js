import styled from 'styled-components';
import { fontWeight, space } from 'styled-system';

import {
  spacing,
  fontSize,
  borderRadius,
  boxShadows,
  colors,
} from 'src/domains/diagnostics/styles';
import { COLLAPSED_STD_GRAPH_HEIGHT_IN_REM } from 'src/domains/diagnostics/scenes/graphs/graph.constants';

export const InsulinPumpPageWrapper = styled.div`
  background-color: ${props => props.blueBackground && colors.blueMarineAlpha5};
  flex: 1;
  display: flex;
  flex-direction: column;
  ${space};
  height: ${props =>
    props.collapsed ? COLLAPSED_STD_GRAPH_HEIGHT_IN_REM : '100%'};
  min-height: ${COLLAPSED_STD_GRAPH_HEIGHT_IN_REM};
`;

InsulinPumpPageWrapper.displayName = 'InsulinPumpPageWrapper';

export const InsulinPumpTableWrapper = styled.div`
  box-sizing: border-box;
  margin: 0 ${spacing.four} 1.8rem;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

InsulinPumpTableWrapper.displayName = 'InsulinPumpTableWrapper';

export const InsulinPumpScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: auto;
  margin-bottom: initial;
  min-width: 80rem;
  overflow: auto;
`;

InsulinPumpScrollWrapper.displayName = 'InsulinPumpScrollWrapper';

export const InsulinPumpGraphWrapper = styled.div`
  height: ${props =>
    props.tableHeight ? COLLAPSED_STD_GRAPH_HEIGHT_IN_REM : 'initial'};
`;
InsulinPumpGraphWrapper.displayName = 'InsulinPumpGraphWrapper';

export const CardDiv = styled.div`
  border: 0.0625rem solid ${colors.grayLight};
  border-bottom: none;
  border-radius: ${borderRadius.six};
  box-shadow: ${boxShadows.two};
  display: flex;
  flex-direction: row;
  overflow: hidden;

  &:last-of-type {
    margin-bottom: ${spacing.two};
  }
`;

CardDiv.displayName = 'CardDiv';

export const ColumnCellsContainerDiv = styled.div`
  border-right: ${props =>
    props.borderRight || `0.0625rem solid ${colors.silverDark}`};
  width: ${props => props.width || 'auto'};
`;

ColumnCellsContainerDiv.displayName = 'ColumnCellsContainerDiv';

export const BaseCellDiv = styled.div`
  background-color: ${colors.white};
  border-bottom: none;
  border-left: none;
  border-right: 0.0625rem solid ${colors.silverDark};
  border-top: none;
  color: ${colors.charcoal};
  font-size: ${fontSize.caption};
  height: 3rem;
  justify-content: center;
  overflow: hidden;
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
`;

BaseCellDiv.displayName = 'BaseCellDiv';

export const AlternatingCellDiv = BaseCellDiv.extend`
  border-bottom: 0.0625rem solid ${colors.silverDark};

  :nth-child(even) {
    background-color: ${colors.silverLight};
  }
`;

AlternatingCellDiv.displayName = 'AlternatingCellDiv';

export const DateCellDiv = BaseCellDiv.extend`
  border: none;
  line-height: 1.125rem;
  padding: ${spacing.one} ${spacing.two};
  text-align: left;
  width: 6.875rem;
  ${props =>
    props.borderBottom
      ? `border-bottom: 0.0625rem solid ${colors.silverDark};
  `
      : ''};
  ${props => (props.averageLabel ? 'line-height: 2.5;' : null)};
`;

DateCellDiv.displayName = 'DateCellDiv';

export const DateWeekendCellDiv = DateCellDiv.extend`
  & ul {
    color: ${colors.blue};
  }
`;

DateWeekendCellDiv.displayName = 'DateWeekendCellDiv';

export const DateLinesUl = styled.ul`
  color: ${colors.charcoal};
  list-style: none;
  margin: 0;
  padding: 0;
`;

DateLinesUl.displayName = 'DateLinesUl';

export const GenericCellDiv = AlternatingCellDiv.extend`
  ${fontWeight};
  width: 3.8rem;
`;

GenericCellDiv.displayName = 'GenericCellDiv';

export const CommentCellDiv = AlternatingCellDiv.extend`
  justify-content: flex-start;
  padding-left: ${spacing.two};
  width: 100%;
  ${fontWeight};
`;

CommentCellDiv.displayName = 'CommentCellDiv';

export const IconWrapper = styled.span`
  margin-right: ${spacing.one};
  &:last-child {
    margin-right: 0;
  }
`;

IconWrapper.displayName = 'IconWrapper';
