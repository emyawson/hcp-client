import { EC6Patient } from '../patient.types';

export type CreatePatientParams = {
  professionalId: number;
  patient: EC6Patient;
};

export type EC6Model = any;

export type EC6Response = {
  resultDescription: string;
};

export type CreatePatientResponse = EC6Response & {
  model: EC6Model;
};

export type CreatePatientErrorResponse = EC6Response & {
  error: Array<{ [key: string]: string }>;
};

export type CreatePatientTransform = (data: CreatePatientResponse) => EC6Model;

export type CreatePatientServiceImplFactoryType = (
  load,
  transform: CreatePatientTransform,
) => CreatePatientServiceImplType;

export type CreatePatientServiceImplType = (
  query: CreatePatientParams,
  token: string,
) => Promise<CreatePatientResponse>;
