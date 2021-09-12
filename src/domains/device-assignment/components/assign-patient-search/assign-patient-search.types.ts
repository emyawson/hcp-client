import { SearchPatient } from '../../scenes/select-patient/select-patient.types';

export type AssignPatientSearchRowProps = SearchPatient & {
  onSelectPatient: () => void;
};

export type AssignPatientSearchTableProps = {
  children?: React.ReactNode;
};
