export type DeviceNotFoundErrorProps = {
  onCancel: () => void;
  deviceInfo: {
    modelDevice: string;
    serialNumber: string | number;
    brandName: string;
  };
  assignedPatientName: string;
};
