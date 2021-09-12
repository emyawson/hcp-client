export type CreatePatientExternalProps = {};

export type CreatePatientConnectProps = {};

export type CreatePatientProps = CreatePatientConnectProps &
  CreatePatientExternalProps;

export type CreatePatientState = {
  step: number;
};
