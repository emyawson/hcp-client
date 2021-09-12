export type GetDeviceAssociationParams = {
  associationId: string;
};

export type DeviceInfo = {
  id?: string;
  modelDevice: string;
  serialNumber: string;
  brandName: string;
  description: string;
  formatName: string;
  reference: string;
};

export type GetDeviceAssociationResponse = {
  associationId: string;
  patientId?: number;
  deviceInfo: DeviceInfo;
};

export type GetDeviceAssociationTransform = (
  data: GetDeviceAssociationEC6Response,
) => GetDeviceAssociationResponse;

export type GetDeviceAssociationServiceFactoryType = (
  load,
  transform: GetDeviceAssociationTransform,
) => GetDeviceAssociationServiceType;

export type GetDeviceAssociationServiceType = (
  query: GetDeviceAssociationParams,
  token: string,
) => Promise<GetDeviceAssociationResponse>;

export type GetDeviceAssociationEC6Response = {
  associationId: string;
  resultDescription: string;
  model: DeviceInfo & { patientId?: number };
};
