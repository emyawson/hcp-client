import { DeviceInfo } from 'src/services/device-assignment';

export const constructDeviceName = (deviceInfo: DeviceInfo): string =>
  deviceInfo ? `${deviceInfo.brandName} ${deviceInfo.modelDevice}` : '';

export const constructDeviceNameWithSerial = (deviceInfo: DeviceInfo): string =>
  deviceInfo
    ? `${constructDeviceName(deviceInfo)} (${deviceInfo.serialNumber})`
    : '';
