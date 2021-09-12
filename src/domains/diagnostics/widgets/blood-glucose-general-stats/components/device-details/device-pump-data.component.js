import React from 'react';
import { isEmpty } from 'ramda';

import { translate } from 'src/i18n'; // TODO: move to diagnostics
import { GridContainer, GridItem } from 'src/domains/diagnostics/components';
import { validateDeviceInfo } from 'src/domains/diagnostics/utils/validators';
import { RenderIf } from 'src/domains/diagnostics/utils/render-if';
import {
  BolusQuickIcon,
  BolusStandardIcon,
  BolusExtendedIcon,
  BolusMultiwaveIcon,
  PumpTbrincIcon,
  PumpTbrdecIcon,
  PumpProfileChangeIcon,
  PumpStopIcon,
  PumpBasalRateChangeIcon,
} from 'src/domains/diagnostics/assets/icons';

import { DeviceDetailsDataRow } from './device-details-data-row.component';
import { DeviceDetailsHeader } from './device-details.style';

export const DevicePumpDataComponent = ({
  deviceData,
  bolusStats,
  basalDataMetrics,
}) => (
  <GridContainer marginBottom marginTop>
    <RenderIf validate={!isEmpty(deviceData)}>
      <GridItem span="12">
        <DeviceDetailsHeader>
          {translate('devices.deviceDetailsTitle')}
        </DeviceDetailsHeader>
      </GridItem>
      <GridItem span="6">
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

    <GridItem span="6">
      <DeviceDetailsDataRow
        titleContent={translate('devices.bolus.basalRateProfileSelectionTitle')}
        dataContent={`${
          basalDataMetrics.basalRateProfileChangePerWeek
        } x / Week`}
      />
    </GridItem>

    {/* Bolus Section  */}
    <RenderIf validate={bolusStats}>
      <GridItem span="8">
        <DeviceDetailsHeader>
          {translate('devices.bolus.bolusTitle')}
        </DeviceDetailsHeader>
      </GridItem>
      <GridItem span="4">
        <DeviceDetailsHeader>
          {translate('devices.bolus.basalRateChangesTitle')}
        </DeviceDetailsHeader>
      </GridItem>
      <GridItem span="4">
        <DeviceDetailsDataRow
          titleContent={translate('devices.bolus.numberOfBolusesTitle')}
          dataContent={bolusStats.total}
        />
        <DeviceDetailsDataRow
          icon={BolusStandardIcon}
          titleContent={translate('devices.bolus.standardBolusTitle')}
          dataContent={bolusStats.std}
        />
        <DeviceDetailsDataRow
          icon={BolusQuickIcon}
          titleContent={translate('devices.bolus.quickBolusTitle')}
          dataContent={bolusStats.scr}
        />
        <DeviceDetailsDataRow
          icon={BolusExtendedIcon}
          titleContent={translate('devices.bolus.extendedBolusTitle')}
          dataContent={bolusStats.ext}
        />
        <DeviceDetailsDataRow
          icon={BolusMultiwaveIcon}
          titleContent={translate('devices.bolus.multiwaveBolusTitle')}
          dataContent={bolusStats.mul}
        />
      </GridItem>

      <GridItem span="4">
        <DeviceDetailsDataRow
          titleContent={translate('devices.bolus.highestResultTitle')}
          dataContent={`${bolusStats.max} U`}
        />
        <DeviceDetailsDataRow
          titleContent={translate('devices.bolus.meanDoseTitle')}
          dataContent={`${bolusStats.mean} U`}
        />
        <DeviceDetailsDataRow
          titleContent={translate('devices.bolus.lowestResultTitle')}
          dataContent={`${bolusStats.min} U`}
        />
        <DeviceDetailsDataRow
          titleContent={translate('devices.bolus.bolusFrequencyTitle')}
          dataContent={`${bolusStats.frequency} / day`}
        />
      </GridItem>
    </RenderIf>

    <GridItem span="4">
      <DeviceDetailsDataRow
        icon={PumpTbrincIcon}
        titleContent={translate('devices.bolus.tbrIncreaseTitle')}
        dataContent={basalDataMetrics.tbrIncreaseCount}
      />
      <DeviceDetailsDataRow
        icon={PumpTbrdecIcon}
        titleContent={translate('devices.bolus.tbrDecreaseTitle')}
        dataContent={basalDataMetrics.tbrDecreaseCount}
      />
      <DeviceDetailsDataRow
        icon={PumpBasalRateChangeIcon}
        titleContent={translate('devices.bolus.basalRateChangeTitle')}
        dataContent="-"
      />
      <DeviceDetailsDataRow
        icon={PumpProfileChangeIcon}
        titleContent={translate('devices.bolus.basalRateProfileSelectionTitle')}
        dataContent={basalDataMetrics.profileChangeCount}
      />
      <DeviceDetailsDataRow
        icon={PumpStopIcon}
        titleContent={translate('devices.bolus.stopTitle')}
        dataContent={`${basalDataMetrics.percentageOfStopEvents}%`}
      />
    </GridItem>
    <GridItem span="12">
      <DeviceDetailsHeader>
        {translate('devices.additionalInfo.additionalInfoTitle')}
      </DeviceDetailsHeader>
    </GridItem>
  </GridContainer>
);
