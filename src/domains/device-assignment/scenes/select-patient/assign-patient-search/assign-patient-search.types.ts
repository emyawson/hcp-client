export type SearchPayload = {
  patientID: string;
  fullName: string;
};

export type AssignPatientSearchProps = {
  readonly onSearch: (search: SearchPayload) => void;
  readonly onCreatePatient: () => void;
  readonly toggleCreatePatientView: () => void;
};
