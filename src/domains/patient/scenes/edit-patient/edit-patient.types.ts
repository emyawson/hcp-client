export type EditPatientExternalProps = {};

export type EditPatientConnectProps = {};

export type EditPatientProps = EditPatientConnectProps &
  EditPatientExternalProps;

export type EditPatientState = {
  step: number;
};
