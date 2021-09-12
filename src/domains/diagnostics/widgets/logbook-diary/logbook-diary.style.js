import styled from 'styled-components';

import {
  borderRadius,
  boxShadows,
  colors,
  fontSize,
  spacing,
} from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';

export const LogbookDiaryPageWrapperDiv = styled.div`
  background-color: ${props => props.blueBackground && colors.blueMarineAlpha5};
  min-height: inherit;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

LogbookDiaryPageWrapperDiv.displayName = 'LogbookDiaryPageWrapperDiv';

export const LogbookDiaryWrapperDiv = styled.div`
  box-sizing: border-box;
  margin: 0 ${spacing.four} 1.8rem;
  overflow-x: auto;
  overflow-y: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

LogbookDiaryWrapperDiv.displayName = 'LogbookDiaryWrapperDiv';

export const LogbookDiaryScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: auto;
  margin-bottom: initial;
  min-width: 80rem;
  overflow-x: auto;
  overflow-y: hidden;
`;

LogbookDiaryScrollWrapper.displayName = 'LogbookDiaryScrollWrapper';

export const CardDiv = styled.div`
  border: 0.0625rem solid ${colors.grayLight};
  border-bottom: none;
  border-radius: ${borderRadius.six};
  box-shadow: ${boxShadows.two};
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;

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

export const RowCellsContainerDiv = ColumnCellsContainerDiv.extend`
  background-color: ${colors.white};
  border: none;
  display: flex;
  flex-direction: row;

  :nth-child(even) {
    background-color: ${colors.silverLight};
  }
`;

RowCellsContainerDiv.displayName = 'RowCellsContainerDiv';

export const BaseCellDiv = styled.div`
  background-color: ${colors.white};
  border-bottom: none;
  border-left: none;
  border-right: 0.0625rem solid ${colors.silverDark};
  border-top: none;
  color: ${colors.charcoal};
  font-size: ${fontSize.caption};
  height: 2.5rem;
  justify-content: center;
  line-height: 1.5rem;
  overflow: hidden;
  padding: ${spacing.two};
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

export const TimeCellDiv = AlternatingCellDiv.extend`
  width: 3.8rem;
`;

TimeCellDiv.displayName = 'TimeCellDiv';

export const BloodGlucoseCellDiv = AlternatingCellDiv.extend`
  border-right: none;
  display: flex;
  line-height: 1.125rem;
  padding: ${spacing.one};
`;

BloodGlucoseCellDiv.displayName = 'BloodGlucoseCellDiv';

export const BloodGlucoseContentsDiv = styled.div`
  align-self: center;
  background-color: ${colors.clear};
  border-radius: ${borderRadius.three};
  border: 0.0625rem solid ${colors.clear};
  color: ${colors.green};
  font-weight: ${weight.semiBold};
  line-height: ${spacing.three};
  padding: ${spacing.one};
  width: 1.95rem;
`;

BloodGlucoseContentsDiv.displayName = 'BloodGlucoseContentsDiv';

export const BloodGlucoseContentsHyperDiv = BloodGlucoseContentsDiv.extend`
  background-color: ${colors.quartzBlue};
  color: ${colors.charcoal};
  font-weight: initial;
`;

BloodGlucoseContentsHyperDiv.displayName = 'BloodGlucoseContentsHyperDiv';

export const BloodGlucoseContentsHypoDiv = BloodGlucoseContentsDiv.extend`
  background-color: ${colors.trafficRed2};
  color: ${colors.charcoal};
  font-weight: initial;

  ${props =>
    props.withInnerBorder
      ? `
          position: relative;
          &:after {
            content: "";
            position: absolute;
            top: 0.0625rem;
            left: 0.0625rem;
            right: 0.0625rem;
            height: 1.4rem;
            border: 0.0625rem solid ${colors.white};
            border-radius: ${borderRadius.three};
          }
        `
      : null};
`;

BloodGlucoseContentsHypoDiv.displayName = 'BloodGlucoseContentsHypoDiv';

export const GlucoseIconCellDiv = BaseCellDiv.extend`
  background-color: ${colors.clear};
  border-bottom: 0.0625rem solid ${colors.silverDark};
  border-right: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: ${spacing.two} 0;
  width: 1.7rem;
`;

GlucoseIconCellDiv.displayName = 'GlucoseIconCellDiv';

export const GlucoseIconCellInnerDiv = GlucoseIconCellDiv.extend`
  background-color: ${colors.clear};
  border-bottom: none;
  border-right: none;
  border-left: ${props =>
    props.children && !props.firstIcon
      ? `1px solid  ${colors.silverDark}`
      : 'none'};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0;
  height 100%;
  width: 1.7rem;
`;

GlucoseIconCellInnerDiv.displayName = 'GlucoseIconCellInnerDiv';

export const CarbohydrateCellDiv = AlternatingCellDiv.extend`
  border-right: none;
  width: 9rem;
`;

CarbohydrateCellDiv.displayName = 'CarbohydrateCellDiv';

export const InsulinCellDiv = BaseCellDiv.extend`
  background-color: ${colors.clear};
  border: none;
  border-bottom: 0.0625rem solid ${colors.silverDark};
  width: 4rem;
`;

InsulinCellDiv.displayName = 'InsulinCellDiv';

export const InsulinBolusTypeIconSpan = styled.span`
  position: relative;
  top: 0.125rem;
  left: 0.125rem;
`;

InsulinBolusTypeIconSpan.displayName = 'InsulinBolusTypeIconSpan';

export const BasalRateCellDiv = AlternatingCellDiv.extend`
  border-right: none;
  width: 8rem;
`;

BasalRateCellDiv.displayName = 'BasalRateCellDiv';

export const PumpCellDiv = AlternatingCellDiv.extend`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-right: none;
  width: 8rem;
  text-align: right;
  padding: 0.7rem;
`;

PumpCellDiv.displayName = 'PumpCellDiv';

export const PumpTextBeforeIconSpan = styled.span`
  padding-right: ${spacing.one};
`;

PumpTextBeforeIconSpan.displayName = 'PumpTextBeforeIconSpan';

export const PumpTextAfterIconSpan = styled.span`
  padding-left: ${spacing.one};
`;

PumpTextAfterIconSpan.displayName = 'PumpTextAfterIconSpan';

export const NotesCellDiv = AlternatingCellDiv.extend`
  border-right: none;
`;

NotesCellDiv.displayName = 'NotesCellDiv';
