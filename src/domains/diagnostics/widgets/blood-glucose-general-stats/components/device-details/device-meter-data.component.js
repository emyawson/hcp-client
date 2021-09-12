import React from 'react';
import { isEmpty } from 'ramda';

import { translate } from 'src/i18n';
import { GridContainer, GridItem } from 'src/domains/diagnostics/components';
import {
  validateDeviceInfo,
  validateDeviceStats,
} from 'src/domains/diagnostics/utils/validators';
import { RenderIf } from 'src/domains/diagnostics/utils/render-if';

import { DeviceDetailsDataRow } from './device-details-data-row.component';
import { DeviceDetailsHeader } from './device-details.style';

export const DeviceMeterDataComponent = ({
  deviceData,
  deviceStats,
  bloodGlucoseMeasurementUnit,
}) => (
  <GridContainer marginBottom marginTop>
    <RenderIf validate={!isEmpty(deviceData)}>
      <GridItem span="12">
        <DeviceDetailsHeader>
          {translate('devices.deviceDetailsTitle')}
        </DeviceDetailsHeader>

        <DeviceDetailsDataRow
          titleContent={translate('devices.deviceDetailsNameTitle')}
          dataContent={validateDeviceInfo(deviceData.name)}
        />
        <DeviceDetailsDataRow
          titleContent={translate('devices.deviceDetailsSerialTitle')}
          dataContent={validateDeviceInfo(deviceData.serial)}
        />
        <DeviceDetailsDataRow
          titleContent={translate('devices.deviceLastReadingTitle')}
          dataContent={validateDeviceInfo(deviceData.lastReading)}
        />
      </GridItem>
    </RenderIf>
    {/* Tests section */}
    <GridItem span="4">
      <DeviceDetailsHeader>
        {translate('devices.deviceDataTitleTests')}
      </DeviceDetailsHeader>
      <DeviceDetailsDataRow
        titleContent={translate('devices.tests.numberOfTestsTitle')}
        dataContent={deviceStats.tests.numberOfTests}
      />
      <DeviceDetailsDataRow
        titleContent={translate('devices.tests.testPerDayTitle')}
        dataContent={`${deviceStats.tests.testsPerDay} (${
          deviceStats.tests.testsPerMeasuredDay
        })`}
      />
    </GridItem>

    {/* Mean Blood Glucose Section */}
    <GridItem span="4">
      <DeviceDetailsHeader>
        {translate('devices.meanBloodGlucose.meanBloodGlucoseTitle')}
      </DeviceDetailsHeader>
      <DeviceDetailsDataRow
        titleContent={translate(
          'devices.meanBloodGlucose.meanBloodGlucoseTitle',
        )}
        dataContent={`${
          deviceStats.meanBG.mean
        } ${bloodGlucoseMeasurementUnit}`}
      />
      <DeviceDetailsDataRow
        titleContent={translate('devices.meanBloodGlucose.standardDevTitle')}
        dataContent={`${
          deviceStats.meanBG.stdDev
        } ${bloodGlucoseMeasurementUnit}`}
      />
      <DeviceDetailsDataRow
        titleContent={translate('devices.meanBloodGlucose.highestTitle')}
        dataContent={`${
          deviceStats.meanBG.highestBG
        } ${bloodGlucoseMeasurementUnit}`}
      />
      <DeviceDetailsDataRow
        titleContent={translate('devices.meanBloodGlucose.lowestTitle')}
        dataContent={`${
          deviceStats.meanBG.lowestBG
        } ${bloodGlucoseMeasurementUnit}`}
      />
    </GridItem>

    {/* Mean BG Before Meals Section */}
    <GridItem span="4">
      <DeviceDetailsHeader>
        {translate(
          'devices.meanBloodGlucoseBeforeMeals.meanBloodGlucoseBeforeMealsTitle',
        )}
      </DeviceDetailsHeader>
      <DeviceDetailsDataRow
        titleContent={translate(
          'devices.meanBloodGlucoseBeforeMeals.meanBloodGlucoseBeforeMealsTitle',
        )}
        dataContent={`${
          deviceStats.meanBeforeMeals.meanBeforeMeals
        } ${bloodGlucoseMeasurementUnit}`}
      />
      <DeviceDetailsDataRow
        titleContent={translate(
          'devices.meanBloodGlucoseBeforeMeals.meanBloodGlucoseBeforeBreakfastTitle',
        )}
        dataContent={`${
          deviceStats.meanBeforeMeals.meanBeforeBreakfast
        } ${bloodGlucoseMeasurementUnit}`}
      />
      <DeviceDetailsDataRow
        titleContent={translate(
          'devices.meanBloodGlucoseBeforeMeals.meanBloodGlucoseBeforeLunchTitle',
        )}
        dataContent={`${
          deviceStats.meanBeforeMeals.meanBeforeLunch
        } ${bloodGlucoseMeasurementUnit}`}
      />
      <DeviceDetailsDataRow
        titleContent={translate(
          'devices.meanBloodGlucoseBeforeMeals.meanBloodGlucoseBeforeDinnerTitle',
        )}
        dataContent={`${
          deviceStats.meanBeforeMeals.meanBeforeDinner
        } ${bloodGlucoseMeasurementUnit}`}
      />
    </GridItem>

    {/* Target Range Section */}
    <GridItem span="4">
      <DeviceDetailsHeader>
        {translate('devices.targetRange.targetRangeTitle')}
      </DeviceDetailsHeader>
      <DeviceDetailsDataRow
        titleContent={translate('devices.targetRange.targetRangeTitle')}
        dataContent={`${validateDeviceStats(
          'targetRange',
          'targetBloodGlucoseMinimum',
          deviceStats,
        )} - ${validateDeviceStats(
          'targetRange',
          'targetBloodGlucoseMaximum',
          deviceStats,
        )} ${bloodGlucoseMeasurementUnit}`}
      />
      <DeviceDetailsDataRow
        titleContent={translate('devices.targetRange.aboveTitle')}
        dataContent={`${validateDeviceStats(
          'targetRange',
          'abovePercentage',
          deviceStats,
        )}% (${validateDeviceStats('targetRange', 'aboveCount', deviceStats)})`}
      />
      <DeviceDetailsDataRow
        titleContent={translate('devices.targetRange.withinTitle')}
        dataContent={`${validateDeviceStats(
          'targetRange',
          'withinPercentage',
          deviceStats,
        )}% (${validateDeviceStats(
          'targetRange',
          'withinCount',
          deviceStats,
        )})`}
      />
      <DeviceDetailsDataRow
        titleContent={translate('devices.targetRange.belowTitle')}
        dataContent={`${validateDeviceStats(
          'targetRange',
          'belowAndHypoPercentage',
          deviceStats,
        )}% (${validateDeviceStats(
          'targetRange',
          'belowAndHypoCount',
          deviceStats,
        )})`}
      />
    </GridItem>

    {/* HYPOS Section */}
    <GridItem span="4">
      <DeviceDetailsHeader>
        {translate('devices.hypos.hypoTitle')}
      </DeviceDetailsHeader>
      <DeviceDetailsDataRow
        titleContent={translate('devices.hypos.hypoLimitTitle')}
        dataContent={`${validateDeviceStats(
          'hypos',
          'hypoglycemiaThreshold',
          deviceStats,
        )} ${bloodGlucoseMeasurementUnit}`}
      />
      <DeviceDetailsDataRow
        titleContent={translate('devices.hypos.hypoglycaemiaTitle')}
        dataContent={`${validateDeviceStats(
          'hypos',
          'hypoglycaemiaNumber',
          deviceStats,
        )}`}
      />
    </GridItem>

    {/* Blood Glucose Index */}
    <GridItem span="4">
      <DeviceDetailsHeader>
        {translate('devices.bloodGlucoseIndex.bloodGlucoseIndexTitle')}
      </DeviceDetailsHeader>
      <DeviceDetailsDataRow
        titleContent={translate('devices.bloodGlucoseIndex.hbgiTitle')}
        dataContent={`${validateDeviceStats('indexes', 'hbgi', deviceStats)}`}
      />
      <DeviceDetailsDataRow
        titleContent={translate('devices.bloodGlucoseIndex.lbgiTitle')}
        dataContent={`${validateDeviceStats('indexes', 'lbgi', deviceStats)}`}
      />
    </GridItem>

    {/* Additional Info Section */}
    <GridItem span="12">
      <DeviceDetailsHeader>
        {translate('devices.additionalInfo.additionalInfoTitle')}
      </DeviceDetailsHeader>
    </GridItem>
  </GridContainer>
);
