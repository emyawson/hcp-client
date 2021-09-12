import { DeviceInfo } from '../../../../services/index';
import {
  DeviceAssignmentBaseProps,
  DeviceAssignmentNavigationProps,
} from '../device-assignment/device-assignment.types';

import { AssignPatientSearchProps } from './assign-patient-search/assign-patient-search.types';

export type SearchPatient = {
  readonly birthDate: string;
  readonly fullName: string;
  readonly healthCareSystemId: string;
  readonly id: number;
};

export type SearchPayload = {
  patientID: string;
  fullName: string;
};

export type SelectPatientContainerProps = {};

export type SelectPatientProps = SelectPatientContainerProps &
  DeviceAssignmentBaseProps &
  DeviceAssignmentNavigationProps &
  AssignPatientSearchProps &
  DeviceInfo & {
    readonly searchResults: SearchPatient[];
    readonly toggleCreatePatientView: () => void;
    readonly onSelectPatient: (id: number) => void;
  };
