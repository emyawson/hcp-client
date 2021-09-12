import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { isEmpty, isNil } from 'ramda';

import {
  GraphDetail,
  ResizeWrapper,
  SeparateBordersTable,
} from 'src/domains/diagnostics/components';
import { RenderIf, withGraphLoader } from 'src/domains/diagnostics/utils';
import { LogbookDiaryTableHeader } from 'src/domains/diagnostics/components/table';
import { HeaderCard } from 'src/domains/diagnostics/components/graph';
import { translate } from 'src/i18n';
import { GraphDetailContainer } from 'src/domains/diagnostics/scenes/graphs/graph.style';
import { BOLUS_TYPE_ICONS } from 'src/domains/diagnostics/scenes/graphs';
import {
  AppleEatenFullColorIcon,
  AppleFullColorIcon,
  BolusExtendedIcon,
  BolusMultiwaveIcon,
  BolusQuickIcon,
  BolusStandardIcon,
  HypoIcon,
  HypoSymptomsIcon,
  PumpPauseIcon,
  PumpPowerDownIcon,
  PumpPowerUpIcon,
  PumpProfileChangeIcon,
  PumpRunIcon,
  PumpStopIcon,
  PumpTbrdecIcon,
  PumpTbrEndDecIcon,
  PumpTbrEndIncIcon,
  PumpTbrincIcon,
} from 'src/domains/diagnostics/assets/icons';

import {
  BasalRateCellDiv,
  BloodGlucoseCellDiv,
  BloodGlucoseContentsDiv,
  BloodGlucoseContentsHyperDiv,
  BloodGlucoseContentsHypoDiv,
  CarbohydrateCellDiv,
  CardDiv,
  ColumnCellsContainerDiv,
  DateCellDiv,
  DateLinesUl,
  DateWeekendCellDiv,
  GlucoseIconCellDiv,
  GlucoseIconCellInnerDiv,
  InsulinCellDiv,
  InsulinBolusTypeIconSpan,
  LogbookDiaryPageWrapperDiv,
  LogbookDiaryScrollWrapper,
  LogbookDiaryWrapperDiv,
  NotesCellDiv,
  PumpCellDiv,
  PumpTextAfterIconSpan,
  PumpTextBeforeIconSpan,
  RowCellsContainerDiv,
  TimeCellDiv,
} from './logbook-diary.style';
import { PUMP_ICONS } from './logbook-diary.constant';

import { MIN_EXPANDED_STD_GRAPH_HEIGHT } from '../../scenes/graphs/graph.constants';
import { LogbookGraphWrapper } from '../logbook/logbook.style';

const LogbookDiaryWrapperDivWithLoader = withGraphLoader(
  LogbookDiaryWrapperDiv,
  translate('graphs.logbook.loading'),
);

export const LogbookDiary = ({ logbookDiaryData, isLoading }) => {
  const cardMarginBottom = 30;
  const cardRowHeight = 40;

  const rowRenderer = ({
    key,
    index: cardIndex,
    isScrolling,
    isVisible,
    style,
  }) => {
    const { dateLine1, dateLine2 } = logbookDiaryData[cardIndex][0];
    const cardData = logbookDiaryData[cardIndex];
    const isWeekendDay =
      cardData[0].dayOfWeek === '6' || cardData[0].dayOfWeek === '7';
    const cardStyle = {
      ...style,
      height: style.height - cardMarginBottom,
    };

    const renderBloodGlucoseCellContentsDivType = ({
      belowTargetRange,
      aboveTargetRange,
      hypoSymptoms,
      glucoseValue,
    }) => {
      if (!isNil(glucoseValue)) {
        if (aboveTargetRange) {
          return (
            <BloodGlucoseContentsHyperDiv>
              {glucoseValue}
            </BloodGlucoseContentsHyperDiv>
          );
        } else if (belowTargetRange) {
          return (
            <BloodGlucoseContentsHypoDiv withInnerBorder={hypoSymptoms}>
              {glucoseValue}
            </BloodGlucoseContentsHypoDiv>
          );
        }
      }

      return <BloodGlucoseContentsDiv>{glucoseValue}</BloodGlucoseContentsDiv>;
    };

    const renderBloodGlucoseIconType = icon => {
      if (icon === 'beforeMeal') {
        return <AppleFullColorIcon width={12} height={14} />;
      } else if (icon === 'afterMeal') {
        return <AppleEatenFullColorIcon width={8.5} height={15.5} />;
      } else if (icon === 'hypo') {
        return <HypoIcon />;
      } else if (icon === 'hypoSymptoms') {
        return <HypoSymptomsIcon />;
      }
    };

    const renderBolusTypeIconType = icon => {
      if (icon === BOLUS_TYPE_ICONS.STANDARD) {
        return <BolusStandardIcon width={14} />;
      } else if (icon === BOLUS_TYPE_ICONS.QUICK) {
        return <BolusQuickIcon width={14} />;
      } else if (icon === BOLUS_TYPE_ICONS.EXTENDED) {
        return <BolusExtendedIcon width={14} />;
      } else if (icon === BOLUS_TYPE_ICONS.MULTIWAVE) {
        return <BolusMultiwaveIcon width={14} />;
      }
    };

    const renderPumpIconType = icon => {
      if (icon === PUMP_ICONS.TBR_INC) {
        return <PumpTbrincIcon width={17} />;
      } else if (icon === PUMP_ICONS.TBR_DEC) {
        return <PumpTbrdecIcon width={17} />;
      } else if (icon === PUMP_ICONS.CHANGED_PROFILE) {
        return <PumpProfileChangeIcon width={16} />;
        // ^ WF Lauren: icon looks like it should be the tbrinc icon
      } else if (icon === PUMP_ICONS.RUN) {
        return <PumpRunIcon width={17} />;
      } else if (icon === PUMP_ICONS.STOP) {
        return <PumpStopIcon width={17} />;
      } else if (icon === PUMP_ICONS.TBR_END_INC) {
        return <PumpTbrEndIncIcon width={19} />;
      } else if (icon === PUMP_ICONS.TBR_END_DEC) {
        return <PumpTbrEndDecIcon width={19} />;
      } else if (icon === PUMP_ICONS.POWER_UP) {
        return <PumpPowerUpIcon width={17} />;
      } else if (icon === PUMP_ICONS.POWER_DOWN) {
        return <PumpPowerDownIcon width={16} />;
      } else if (icon === PUMP_ICONS.PAUSE) {
        return <PumpPauseIcon width={17} />;
      }
    };

    return (
      <CardDiv key={`card-${cardIndex}`} style={cardStyle}>
        <ColumnCellsContainerDiv>
          {cardData.map((rowData, index) => {
            const cellValue =
              index === 0 ? (
                <DateLinesUl>
                  <li>{dateLine1}</li>
                  <li>{dateLine2}</li>
                </DateLinesUl>
              ) : (
                <span>&nbsp;</span>
              );
            const CellType = isWeekendDay ? DateWeekendCellDiv : DateCellDiv;
            return <CellType key={`date-cell-${index}`}>{cellValue}</CellType>;
          })}
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv borderRight="none">
          {cardData.map((rowData, index) => (
            <TimeCellDiv key={`time-cell-${index}`}>{rowData.time}</TimeCellDiv>
          ))}
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv borderRight="none">
          {cardData.map((rowData, index) => (
            <BloodGlucoseCellDiv key={`bg-cell-${index}`}>
              {renderBloodGlucoseCellContentsDivType(rowData)}
            </BloodGlucoseCellDiv>
          ))}
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv>
          {cardData.map((rowData, index) => (
            <RowCellsContainerDiv key={`glucose-icon-row-${index}`}>
              {rowData.glucoseIcons.map((icon, index) => {
                const firstIcon = index === 0;

                return (
                  <GlucoseIconCellDiv key={`icon-cell-${index}`}>
                    <GlucoseIconCellInnerDiv firstIcon={firstIcon}>
                      {renderBloodGlucoseIconType(icon)}
                    </GlucoseIconCellInnerDiv>
                  </GlucoseIconCellDiv>
                );
              })}
            </RowCellsContainerDiv>
          ))}
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv>
          {cardData.map((rowData, index) => (
            <CarbohydrateCellDiv key={`carbohydrate-cell-${index}`}>
              {rowData.carbohydrates}
            </CarbohydrateCellDiv>
          ))}
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv>
          {cardData.map((rowData, index) => (
            <RowCellsContainerDiv key={`insulin-row-${index}`}>
              <InsulinCellDiv>
                {rowData.bolusValue}
                <InsulinBolusTypeIconSpan>
                  {renderBolusTypeIconType(rowData.bolusTypeIcon)}
                </InsulinBolusTypeIconSpan>
              </InsulinCellDiv>
              <InsulinCellDiv>&nbsp;</InsulinCellDiv>
              <InsulinCellDiv>&nbsp;</InsulinCellDiv>
            </RowCellsContainerDiv>
          ))}
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv>
          {cardData.map((rowData, index) => (
            <BasalRateCellDiv key={`basal-rate-cell-${index}`}>
              {rowData.basalRateProfile}
            </BasalRateCellDiv>
          ))}
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv>
          {cardData.map((rowData, index) => (
            <PumpCellDiv key={`pump-cell-${index}`}>
              <PumpTextBeforeIconSpan>
                {rowData.pumpTextBeforeIcon}
              </PumpTextBeforeIconSpan>
              {renderPumpIconType(rowData.pumpIcon)}
              <PumpTextAfterIconSpan>
                {rowData.pumpTextAfterIcon}
              </PumpTextAfterIconSpan>
            </PumpCellDiv>
          ))}
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv borderRight="none" width="100%">
          {cardData.map((rowData, index) => (
            <NotesCellDiv key={`notes-cell-${index}`}>&nbsp;</NotesCellDiv>
          ))}
        </ColumnCellsContainerDiv>
      </CardDiv>
    );
  };

  return (
    <LogbookDiaryPageWrapperDiv
      blueBackground={!isEmpty(logbookDiaryData) && !isLoading}
    >
      <HeaderCard
        title={translate('graphs.logbookDiary.diary')}
        noPaddingTop
        noMarginTop
      />
      <LogbookDiaryWrapperDivWithLoader
        hasError={isEmpty(logbookDiaryData) && !isLoading}
        isLoading={isLoading}
      >
        <SeparateBordersTable width="auto" clearFill>
          <LogbookDiaryTableHeader />
        </SeparateBordersTable>
        <LogbookDiaryScrollWrapper innerRef={node => (this.wrapper = node)}>
          <ResizeWrapper
            minHeight={MIN_EXPANDED_STD_GRAPH_HEIGHT}
            render={height => (
              <LogbookGraphWrapper tableHeight={height}>
                <AutoSizer>
                  {({ width }) => (
                    <List
                      rowCount={logbookDiaryData.length}
                      overscanRowCount={1}
                      rowRenderer={rowRenderer}
                      height={height}
                      width={width}
                      rowHeight={({ index }) =>
                        logbookDiaryData[index].length * cardRowHeight +
                        cardMarginBottom
                      }
                      containerStyle={{ overflow: 'visible' }}
                    />
                  )}
                </AutoSizer>
              </LogbookGraphWrapper>
            )}
            resizeFunction={clientHeight => clientHeight}
          />
        </LogbookDiaryScrollWrapper>
      </LogbookDiaryWrapperDivWithLoader>
      <RenderIf validate={!isEmpty(logbookDiaryData) && !isLoading}>
        <GraphDetailContainer>
          <GraphDetail graphType="logbook" />
        </GraphDetailContainer>
      </RenderIf>
    </LogbookDiaryPageWrapperDiv>
  );
};
