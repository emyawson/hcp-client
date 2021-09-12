import { CreatePatientParams } from 'src/services/patient/create-patient/create-patient.types';

export type CreatePatientExternalProps = {
  onStep: (step: number) => void;
  onCreatePatient: (payload: CreatePatientParams) => void;
  context: 'normal' | 'udtc';
  goToHome?: () => void;
};

export type CreatePatientConnectProps = {
  departmentId: string;
  getDepartmentProfileTypes: () => void;
  getCountries: () => void;
};

export type CreatePatientProps = CreatePatientConnectProps &
  CreatePatientExternalProps;

export type CreatePatientState = {
  profileTypeSelected: boolean;
  patientInfoCompleted: boolean;
  healthInfoCompleted: boolean;
  hasErrored: boolean;
};
