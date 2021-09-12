import React from 'react';

import { ArrowIcon } from 'src/domains/diagnostics/assets/icons';
import { translate } from 'src/i18n';
import { colors } from 'src/domains/diagnostics/styles';
import { RenderIf } from 'src/domains/diagnostics/utils';

import {
  firstColumn,
  secondColumn,
  thirdColumn,
} from './logbook-stats-table-header.constants';
import {
  CaretWrapper,
  HeaderCell,
  HeaderColumn,
  HeaderDayColumn,
  HeaderColumnInner,
  LogbookStatsTableHeaderWrapper,
  DateWrapper,
  Row,
} from './logbook-stats-table-header.style';

import { LOGBOOK_LOGBOOK_MIN_WIDTH } from '../../scenes/graphs/graph.constants';

export const FirstRowColumn = ({ colSpan, textKey }) => (
  <HeaderColumnInner flex={colSpan}>
    <HeaderCell
      bold
      borderBottom={{ size: '0.125rem', color: colors.blueMarine }}
    >
      {translate(textKey)}
    </HeaderCell>
  </HeaderColumnInner>
);

export const SecondRowColumn = ({ colSpan, textKeys }) => (
  <HeaderColumnInner flex={colSpan}>
    <HeaderCell bold borderBottom={{ color: colors.blueMarine }}>
      {textKeys.map(textKey => (
        <div key={`Column ${textKey}`}>{translate(textKey)}</div>
      ))}
    </HeaderCell>
  </HeaderColumnInner>
);

export const ThirdRowColumn = ({ colSpan, textKey }) => (
  <HeaderColumnInner flex={colSpan} key={`Column - ${textKey}`}>
    <HeaderCell textAlign="center">{translate(textKey)}</HeaderCell>
  </HeaderColumnInner>
);

export const LogbookStatsTableHeader = () => (
  <LogbookStatsTableHeaderWrapper
    minWidth={LOGBOOK_LOGBOOK_MIN_WIDTH}
    height={7.35}
    paddingBottom={0.2}
  >
    <Row>
      <HeaderDayColumn flex={1}>
        <Row>
          <HeaderColumn>
            <HeaderCell bold>
              <DateWrapper>
                <span>{translate('graphs.logbookStats.date')}</span>
                <CaretWrapper>
                  <ArrowIcon fillColor={colors.blueMarine} height={8} />
                </CaretWrapper>
              </DateWrapper>
            </HeaderCell>
          </HeaderColumn>
        </Row>
      </HeaderDayColumn>
      {[firstColumn, secondColumn, thirdColumn].map(
        ({ colSpan, rows }, index) => (
          <HeaderColumn flex={colSpan} key={`Header Column ${index}`}>
            <RenderIf validate={rows[0]}>
              <Row flex={1.5}>
                {rows[0].map(({ colSpan, textKey }, firstRowIndex) => (
                  <FirstRowColumn
                    colSpan={colSpan}
                    key={`Column ${index} - Row 1 - Column ${firstRowIndex}`}
                    textKey={textKey}
                  />
                ))}
              </Row>
            </RenderIf>
            <RenderIf validate={rows[1]}>
              <Row flex={2}>
                {rows[1].map(({ colSpan, textKeys }, secondRowIndex) => (
                  <SecondRowColumn
                    colSpan={colSpan}
                    key={`Column ${index} - Row 2 - Column ${secondRowIndex}`}
                    textKeys={textKeys}
                  />
                ))}
              </Row>
            </RenderIf>
            <RenderIf validate={rows[2]}>
              <Row>
                {rows[2].map(({ colSpan, textKey }, thirdRowIndex) => (
                  <ThirdRowColumn
                    colSpan={colSpan}
                    key={`Column ${index} - Row 3 - Column ${thirdRowIndex}`}
                    textKey={textKey}
                  />
                ))}
              </Row>
            </RenderIf>
          </HeaderColumn>
        ),
      )}
    </Row>
  </LogbookStatsTableHeaderWrapper>
);
