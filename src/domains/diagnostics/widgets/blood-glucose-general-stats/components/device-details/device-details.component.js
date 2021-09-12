import React from 'react';
import { isEmpty } from 'ramda';

import { RenderIf } from 'src/domains/diagnostics/utils/render-if';
import { Card } from 'src/domains/diagnostics/components';
import { DEVICE_DETAILS } from 'src/domains/diagnostics/constants/device.constants';

import { DeviceMeterDataComponent } from './device-meter-data.component';
import { DevicePumpDataComponent } from './device-pump-data.component';

const renderDevice = (
  deviceStats,
  bloodGlucoseMeasurementUnit,
  bolusStats,
  basalDataMetrics,
) => (device, index) => (
  <React.Fragment key={index}>
    <RenderIf
      validate={
        device.type === DEVICE_DETAILS.PUMP ||
        device.type === DEVICE_DETAILS.CALCULATOR
      }
    >
      <Card cardStyles={['noPadding']} marginTop="1.75rem">
        <DevicePumpDataComponent
          key={index}
          bolusStats={bolusStats}
          deviceData={device}
          basalDataMetrics={basalDataMetrics}
        />
      </Card>
    </RenderIf>
    <RenderIf
      validate={
        device.type !== DEVICE_DETAILS.PUMP &&
        device.type !== DEVICE_DETAILS.CALCULATOR
      }
    >
      <Card cardStyles={['noPadding']} marginTop="1.75rem">
        <DeviceMeterDataComponent
          key={index}
          deviceData={device}
          deviceStats={deviceStats}
          bloodGlucoseMeasurementUnit={bloodGlucoseMeasurementUnit}
        />
      </Card>
    </RenderIf>
  </React.Fragment>
);

export const DeviceDetailsComponent = ({
  match,
  deviceId,
  deviceData,
  deviceStats,
  bolusStats,
  bloodGlucoseMeasurementUnit,
  basalDataMetrics,
  basalData,
}) => (
  <React.Fragment>
    <RenderIf validate={isEmpty(deviceId)}>
      {deviceData.map(
        renderDevice(
          deviceStats,
          bloodGlucoseMeasurementUnit,
          bolusStats,
          basalDataMetrics,
        ),
      )}
    </RenderIf>

    <RenderIf validate={!isEmpty(deviceId)}>
      {deviceData
        .filter(deviceObject => deviceObject.id === Number(deviceId))
        .map(
          renderDevice(
            deviceStats,
            bloodGlucoseMeasurementUnit,
            bolusStats,
            basalDataMetrics,
          ),
        )}
    </RenderIf>
  </React.Fragment>
);
