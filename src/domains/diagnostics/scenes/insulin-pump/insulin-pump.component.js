import React from 'react';
import { AutoSizer, List } from 'react-virtualized';

import { translate } from 'src/i18n';
import { HeaderCard } from 'src/domains/diagnostics/components/graph';
import { InsulinPumpTableHeader } from 'src/domains/diagnostics/components/table';
import {
  SeparateBordersTable,
  ResizeWrapper,
  GraphDetail,
} from 'src/domains/diagnostics/components';
import {
  BolusExtendedIcon,
  BolusMultiwaveIcon,
  BolusQuickIcon,
  BolusStandardIcon,
  LightBulbIcon,
  BasalPlusBolusIcon,
  ModifiedBolusIcon,
} from 'src/domains/diagnostics/assets/icons';
import {
  BOLUS_TYPE_ICONS,
  BOLUS_CONDITIONS,
} from 'src/domains/diagnostics/scenes/graphs';
import { GraphDetailContainer } from 'src/domains/diagnostics/scenes/graphs/graph.style';
import { RenderIf, withGraphLoader } from 'src/domains/diagnostics/utils';

import {
  InsulinPumpPageWrapper,
  InsulinPumpTableWrapper,
  InsulinPumpScrollWrapper,
  InsulinPumpGraphWrapper,
  CardDiv,
  ColumnCellsContainerDiv,
  DateCellDiv,
  DateWeekendCellDiv,
  DateLinesUl,
  GenericCellDiv,
  CommentCellDiv,
  IconWrapper,
} from './';

import { EMPTY_ICON } from './store/insulin-pump.constant';

import {
  COLLAPSED_STD_GRAPH_HEIGHT,
  MIN_EXPANDED_STD_GRAPH_HEIGHT,
} from '../../scenes/graphs/graph.constants';

const cardMarginBottom = 30;
const cardRowHeight = 48;

const renderIcon = icon => {
  if (icon === BOLUS_TYPE_ICONS.STANDARD) {
    return <BolusStandardIcon width={14} />;
  } else if (icon === BOLUS_TYPE_ICONS.QUICK) {
    return <BolusQuickIcon width={14} />;
  } else if (icon === BOLUS_TYPE_ICONS.EXTENDED) {
    return <BolusExtendedIcon width={14} />;
  } else if (icon === BOLUS_TYPE_ICONS.MULTIWAVE) {
    return <BolusMultiwaveIcon width={14} />;
  } else if (icon === BOLUS_CONDITIONS.ADVICE) {
    return <LightBulbIcon />;
  } else if (icon === BOLUS_CONDITIONS.MODIFIED) {
    return <ModifiedBolusIcon />;
  } else if (icon === EMPTY_ICON) {
    return '';
  }
};

const InsulinPumpTableWrapperWithLoader = withGraphLoader(
  InsulinPumpTableWrapper,
  translate('graphs.insulinPump.loading'),
);

export const InsulinPump = ({
  collapsed,
  showDetails,
  daysData,
  isLoading,
  hasData,
}) => {
  const tableData = showDetails ? daysData : daysData.slice(0, 2);
  const marginTop = showDetails ? '-2rem' : '0';
  const rowRenderer = ({
    key,
    index: cardIndex,
    isScrolling,
    isVisible,
    style,
  }) => {
    const cardStyle = {
      ...style,
      height: style.height - cardMarginBottom,
    };

    const cardData = tableData[cardIndex];
    const { boluses, isWeekend, date } = cardData;

    const DateCell = isWeekend ? DateWeekendCellDiv : DateCellDiv;

    return (
      <CardDiv key={`card-${cardIndex}`} style={cardStyle}>
        <ColumnCellsContainerDiv>
          {boluses.map((bolus, index) => (
            <DateCell
              key={`bolusDate-${index}`}
              borderBottom={index === boluses.length - 1}
            >
              {index === 0 ? (
                <DateLinesUl>
                  <li>{date.split(', ')[0]},</li>
                  <li>
                    {date
                      .split(', ')
                      .slice(1)
                      .join(', ')}
                  </li>
                </DateLinesUl>
              ) : (
                <span>&nbsp;</span>
              )}
            </DateCell>
          ))}
          <DateCell averageLabel>
            {translate('graphs.insulinPump.daysTotal')}
          </DateCell>
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv>
          {boluses.map((bolus, index) => (
            <GenericCellDiv key={`bolusTime-${index}`}>
              {bolus.time}
            </GenericCellDiv>
          ))}
          <GenericCellDiv>&nbsp;</GenericCellDiv>
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv>
          {boluses.map((bolus, index) => (
            <GenericCellDiv key={`bolusValue-${index}`}>
              {bolus.bolusValue}
            </GenericCellDiv>
          ))}
          <GenericCellDiv fontWeight="bold">
            {cardData.daysTotal.bolusTotal}
          </GenericCellDiv>
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv>
          {boluses.map((bolus, index) => (
            <GenericCellDiv key={`boluses-${index}`}>
              {bolus.types.map((type, index) => (
                <IconWrapper key={`bolusType-${index}`}>
                  {renderIcon(type)}
                </IconWrapper>
              ))}
            </GenericCellDiv>
          ))}
          <GenericCellDiv>&nbsp;</GenericCellDiv>
        </ColumnCellsContainerDiv>
        <ColumnCellsContainerDiv width="100%">
          {boluses.map((bolus, index) => (
            <CommentCellDiv key={`bolusComment-${index}`}>
              <span>&nbsp;</span>
            </CommentCellDiv>
          ))}
          <CommentCellDiv fontWeight="bold">
            <BasalPlusBolusIcon /> = {cardData.daysTotal.comment.text}
          </CommentCellDiv>
        </ColumnCellsContainerDiv>
      </CardDiv>
    );
  };

  return (
    <InsulinPumpPageWrapper
      mt={marginTop}
      blueBackground={hasData}
      collapsed={collapsed}
    >
      <RenderIf validate={showDetails}>
        <HeaderCard
          title={translate('graphs.insulinPump.title')}
          subtitle={translate('graphs.insulinPump.subtitle')}
        />
      </RenderIf>
      <InsulinPumpTableWrapperWithLoader
        isLoading={isLoading}
        hasError={!hasData}
      >
        <SeparateBordersTable width="auto" clearFill pb="0.7rem">
          <InsulinPumpTableHeader />
        </SeparateBordersTable>
        <InsulinPumpScrollWrapper innerRef={node => (this.wrapper = node)}>
          <ResizeWrapper
            minHeight={
              collapsed
                ? COLLAPSED_STD_GRAPH_HEIGHT
                : MIN_EXPANDED_STD_GRAPH_HEIGHT
            }
            render={height => (
              <InsulinPumpGraphWrapper
                tableHeight={collapsed ? 'COLLAPSED_STD_GRAPH_HEIGHT' : height}
              >
                <AutoSizer>
                  {({ width }) => (
                    <List
                      rowCount={tableData.length}
                      overscanRowCount={1}
                      rowRenderer={rowRenderer}
                      height={height}
                      width={width}
                      rowHeight={({ index }) =>
                        (tableData[index].boluses.length + 1) * cardRowHeight +
                        cardMarginBottom
                      }
                      containerStyle={{ overflow: 'visible' }}
                    />
                  )}
                </AutoSizer>
              </InsulinPumpGraphWrapper>
            )}
            resizeFunction={clientHeight => clientHeight}
          />
        </InsulinPumpScrollWrapper>
      </InsulinPumpTableWrapperWithLoader>
      <RenderIf validate={showDetails && hasData}>
        <GraphDetailContainer>
          <GraphDetail graphType="insulin-pump" />
        </GraphDetailContainer>
      </RenderIf>
    </InsulinPumpPageWrapper>
  );
};
