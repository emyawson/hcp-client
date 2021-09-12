import React, { Fragment } from 'react';
import { isNil } from 'ramda';

import {
  CircleMarkIcon,
  RectangleMarkIcon,
} from 'src/domains/diagnostics/assets/icons';
import { colors } from 'src/domains/diagnostics/styles';
import { convertPxToRem } from 'src/domains/diagnostics/utils';

import { BasalRateTableHeader } from './basal-rate-table-header.component';

import { ComparisonBar } from '../insulin-table/comparison-bar.component';
import { ComparisonBarWrapper } from '../insulin-table/comparison-bar.style';
import {
  Column,
  SubColumn,
  Row,
  RowNoBorder,
  SpanWithRightPadding,
} from '../insulin-table/insulin-table.style';
import { formatDecimalAsPercentage } from '../../utils';

const NoIcon = () => null;

const StopIcon = () => (
  <SpanWithRightPadding>
    <RectangleMarkIcon
      fillColor={colors.trafficOrange}
      strokeColor={colors.trafficOrange}
    />
  </SpanWithRightPadding>
);

export const BasalRateTable = ({ basalRateTableData = [] }) => {
  if (basalRateTableData.length === 0) {
    return null;
  }

  const profiles = basalRateTableData.map(
    (profile, index) =>
      index === 5
        ? { Icon: StopIcon, ...profile }
        : { Icon: NoIcon, ...profile },
  );

  return (
    <Fragment>
      <BasalRateTableHeader />
      {profiles.map(
        (
          {
            Icon,
            profileName,
            profilePercentage,
            tbrIncreases,
            tbrDecreases,
            basalRateChanges,
          },
          index,
        ) => (
          <Row key={`${profileName}-${index}`}>
            <Column flex="2">
              <RowNoBorder>
                <SubColumn minWidth={convertPxToRem(70)}>
                  <Icon />
                  {profileName}
                </SubColumn>
                <SubColumn flex={4}>
                  <ComparisonBarWrapper>
                    <ComparisonBar
                      line1Percentage={profilePercentage}
                      line1FillColor={colors.blueMarine}
                      line2Percentage={0}
                      line2FillColor={null}
                    />
                  </ComparisonBarWrapper>
                </SubColumn>
                <SubColumn textAlign="center" minWidth={convertPxToRem(80)}>
                  <SpanWithRightPadding>
                    {profilePercentage > 0 ? (
                      <CircleMarkIcon
                        fillColor={colors.blueMarine}
                        strokeColor={colors.blueMarine}
                      />
                    ) : null}
                  </SpanWithRightPadding>
                  {formatDecimalAsPercentage(profilePercentage)}
                </SubColumn>
              </RowNoBorder>
            </Column>
            <Column textAlign="right" noBorder noPadding>
              {!isNil(tbrIncreases) ? `${tbrIncreases} x` : ''}
            </Column>
            <Column textAlign="right" noBorder noPadding>
              {!isNil(tbrDecreases) ? `${tbrDecreases} x` : ''}
            </Column>
          </Row>
        ),
      )}
    </Fragment>
  );
};
