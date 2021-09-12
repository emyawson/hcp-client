export type DeviceType = 'METER' | 'CALCULATOR' | 'PUMP';

export type Device = {
  id: string,
  serialNumber: string,
  name: string,
  description: string,
};
