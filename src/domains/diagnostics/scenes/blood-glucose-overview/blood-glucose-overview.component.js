import React from 'react';

import { DisclaimerIcon } from 'src/domains/diagnostics/assets/icons';
import { Button } from 'src/domains/diagnostics/components';
import { CardMinimizer } from 'src/domains/diagnostics/components/card';
import {
  GridContainer,
  GridItem,
} from 'src/domains/diagnostics/components/grid-layout';
import { colors, fontSize } from 'src/domains/diagnostics/styles';
import { Pager } from 'src/domains/diagnostics/components/pager';
import { CardWrapper } from 'src/domains/diagnostics/scenes/graphs/graph.style';
import { translate } from 'src/i18n'; // TODO: move to diagnostics
import { convertPxToRem, RenderIf } from 'src/domains/diagnostics/utils';
import { PatientSummaryBarContainer } from 'src/domains/diagnostics/widgets/patient-summary-bar';

import { BloodGlucoseOverviewTable } from './components/blood-glucose-overview-table';
import { BloodGlucoseOverviewTableRow } from './components/blood-glucose-overview-table-row';
import { IntervalsHeader } from './components/intervals-header';
import {
  BloodGlucoseOverviewFlexibleHeightCard,
  BloodGlucoseOverviewSubCard,
  BloodGlucoseOverviewMainCardHeader,
} from './blood-glucose-overview.style';
import { FilterBar } from './components/filter-bar/filter-bar.component';
import { TrafficLight } from './components/traffic-light';
import { TRAFFIC_LIGHT_LABELS } from './store/blood-glucose-overview.constants';
import { InsufficientDataTooltip } from './components/insufficient-data-tooltip';

const renderBGStatusCell = data => {
  if (!data) {
    return data;
  }
  const { color, label } = data;
  return (
    <TrafficLight
      color={color}
      emptyInnerCircle={label === TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO}
      label={label}
    >
      <RenderIf validate={label === TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO}>
        <InsufficientDataTooltip />
      </RenderIf>
    </TrafficLight>
  );
};

const renderBGStatisticsCell = data => data;

export const BloodGlucoseOverview = ({
  bloodGlucoseOverview: {
    bgStatus: {
      hypoRisk = [],
      meanBloodGlucose: statusMeanBloodGlucose,
      variability,
    },
    bgStatistics: {
      meanBloodGlucose: statisticsMeanBloodGlucose,
      testsPerDay,
      hypoglycaemia = [],
    },
    dateRanges = [],
  },
  endDate,
  getClinicalData,
  match,
  onBloodGlucoseOverviewEndDateChange,
  onBloodGlucoseOverviewStartDateChange,
  onChangeInterval,
  onClickPager,
  onClickDisclaimer,
  patient,
  isThereNextInterval,
  isTherePrevInterval,
  thresholds: { hypoglycemiaThreshold },
}) => (
  <GridContainer marginBottom>
    <GridItem span="12">
      <PatientSummaryBarContainer />
    </GridItem>
    <GridItem span="12" textAlign="right">
      <Button
        label={translate('general.disclaimers')}
        fontSize={fontSize.subheading}
        fontWeight="bold"
        buttonStyle="info"
        onClick={onClickDisclaimer}
        icon={
          <DisclaimerIcon
            height="17"
            withBorder
            iconColor={colors.white}
            borderFillColor={colors.blueMarine}
            borderColor={colors.transparent}
          />
        }
      />
    </GridItem>
    <GridItem span="12">
      <CardWrapper>
        <BloodGlucoseOverviewFlexibleHeightCard>
          <BloodGlucoseOverviewMainCardHeader>
            <FilterBar onChangeInterval={onChangeInterval} />{' '}
            <CardMinimizer link={`/patients/${match.params.id}`} />
            <Pager
              onClickPager={onClickPager}
              isDisabledPrev={isTherePrevInterval}
              isDisabledSuperPrev={isTherePrevInterval}
              isDisabledNext={isThereNextInterval}
              isDisabledSuperNext={isThereNextInterval}
            >
              <IntervalsHeader intervals={dateRanges} />
            </Pager>
          </BloodGlucoseOverviewMainCardHeader>
          <BloodGlucoseOverviewSubCard>
            <BloodGlucoseOverviewTable
              title={translate('bloodGlucoseOverview.bgStatus')}
            >
              <BloodGlucoseOverviewTableRow
                borderBottom
                renderCell={renderBGStatusCell}
                data={hypoRisk}
                height={convertPxToRem(125)}
                width={convertPxToRem(145)}
                bodyFontSize={fontSize.caption}
                rowNumber={1}
                titleLines={[translate('bloodGlucoseOverview.hypoRisk')]}
              />
              <BloodGlucoseOverviewTableRow
                borderBottom
                renderCell={renderBGStatusCell}
                data={statusMeanBloodGlucose}
                height={convertPxToRem(125)}
                width={convertPxToRem(145)}
                bodyFontSize={fontSize.caption}
                rowNumber={2}
                titleLines={[
                  translate('bloodGlucoseOverview.meanBloodGlucose'),
                ]}
              />
              <BloodGlucoseOverviewTableRow
                borderBottom
                renderCell={renderBGStatusCell}
                data={variability}
                height={convertPxToRem(125)}
                width={convertPxToRem(145)}
                bodyFontSize={fontSize.caption}
                rowNumber={3}
                titleLines={[translate('bloodGlucoseOverview.variability')]}
              />
            </BloodGlucoseOverviewTable>
          </BloodGlucoseOverviewSubCard>
          <BloodGlucoseOverviewSubCard>
            <BloodGlucoseOverviewTable
              title={translate('bloodGlucoseOverview.bgStatistics')}
            >
              <BloodGlucoseOverviewTableRow
                borderBottom
                renderCell={renderBGStatisticsCell}
                data={statisticsMeanBloodGlucose}
                height={convertPxToRem(75)}
                width={convertPxToRem(145)}
                bodyFontSize={fontSize.subheading}
                rowNumber={4}
                titleLines={[
                  translate('bloodGlucoseOverview.meanBloodGlucose'),
                  `(${translate('bloodGlucoseOverview.mgPerDL')})`,
                ]}
              />
              <BloodGlucoseOverviewTableRow
                borderBottom
                renderCell={renderBGStatisticsCell}
                data={testsPerDay}
                height={convertPxToRem(75)}
                width={convertPxToRem(145)}
                bodyFontSize={fontSize.subheading}
                rowNumber={5}
                titleLines={[translate('bloodGlucoseOverview.testsPerDay')]}
              />
              <BloodGlucoseOverviewTableRow
                borderBottom={{ size: '0.125rem', thick: true }}
                renderCell={renderBGStatisticsCell}
                data={hypoglycaemia}
                height={convertPxToRem(75)}
                width={convertPxToRem(145)}
                bodyFontSize={fontSize.subheading}
                rowNumber={6}
                titleLines={[
                  `${translate('bloodGlucoseOverview.hypoglycaemia')}`,
                  `(<${hypoglycemiaThreshold} ${translate(
                    'bloodGlucoseOverview.mgPerDL',
                  )})`,
                ]}
                textColor={colors.red}
              />
            </BloodGlucoseOverviewTable>
          </BloodGlucoseOverviewSubCard>
        </BloodGlucoseOverviewFlexibleHeightCard>
      </CardWrapper>
    </GridItem>
  </GridContainer>
);
