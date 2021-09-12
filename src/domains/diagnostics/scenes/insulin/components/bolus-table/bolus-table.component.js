import React, { Fragment } from 'react';

import {
  BolusStandardIcon,
  BolusExtendedIcon,
  BolusMultiwaveIcon,
  BolusQuickIcon,
} from 'src/domains/diagnostics/assets/icons';
import { colors } from 'src/domains/diagnostics/styles';
import { LocalizedText } from 'src/domains/diagnostics/components';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { BolusTableHeader } from './bolus-table-header.component';
import { BolusTableLegend } from './bolus-table-legend.component';
import { RedCircle } from './red-circle.component';

import { ComparisonBar } from '../insulin-table/comparison-bar.component';
import { ComparisonBarWrapper } from '../insulin-table/comparison-bar.style';
import {
  Column,
  Row,
  SpanWithRightPadding,
} from '../insulin-table/insulin-table.style';
import { formatDecimalAsPercentage } from '../../utils';

export const BolusTable = ({ bolusTableData = [] }) => {
  if (bolusTableData.length === 0) {
    return null;
  }

  const [
    standardBolus,
    quickBolus,
    extendedBolus,
    multiwaveBolus,
  ] = bolusTableData;
  const bolusTypes = [
    {
      Icon: BolusStandardIcon,
      textKey: 'graphs.insulin.standardBolus',
      ...standardBolus,
    },
    {
      Icon: BolusQuickIcon,
      textKey: 'graphs.insulin.quickBolus',
      ...quickBolus,
    },
    {
      Icon: BolusExtendedIcon,
      textKey: 'graphs.insulin.extendedBolus',
      ...extendedBolus,
    },
    {
      Icon: BolusMultiwaveIcon,
      textKey: 'graphs.insulin.multiwaveBolus',
      ...multiwaveBolus,
    },
  ];
  return (
    <Fragment>
      <BolusTableLegend />
      <BolusTableHeader />
      {bolusTypes.map(
        (
          { Icon, textKey, bolus, remoteBolus, numberOfBolusesPerDay },
          index,
        ) => (
          <Row key={`${textKey}-${index}`}>
            <Column>
              <Icon /> <LocalizedText textKey={textKey} />
            </Column>
            <Column>
              <ComparisonBarWrapper>
                <ComparisonBar
                  line1Percentage={bolus}
                  line1FillColor={colors.red}
                />
              </ComparisonBarWrapper>
            </Column>
            <Column>
              <SpanWithRightPadding>
                <RedCircle />
                {` ${formatDecimalAsPercentage(bolus)} `}
              </SpanWithRightPadding>
            </Column>
            <Column>{`${numberOfBolusesPerDay.toFixed(1)} / ${translate(
              'graphs.insulin.day',
            )}`}</Column>
          </Row>
        ),
      )}
    </Fragment>
  );
};
