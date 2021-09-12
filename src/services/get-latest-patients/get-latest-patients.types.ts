export type GetLatestPatientsParams = {
  professionalId: number;
};

export type GetLatestPatientsResponse = GetLatestPatientsEC6Response['model'];

export type GetLatestPatientsTransform = (
  data: GetLatestPatientsEC6Response,
) => GetLatestPatientsResponse;

export type GetLatestPatientsServiceFactoryType = (
  load,
  transform: GetLatestPatientsTransform,
) => GetLatestPatientsServiceType;

export type GetLatestPatientsServiceType = (
  query: GetLatestPatientsParams,
  token: string,
) => Promise<GetLatestPatientsResponse>;

export type GetLatestPatientsEC6Response = {
  resultDescription: 'patientLatestOK';
  model: GetLatestPatientResult[];
};

export type GetLatestPatientResult = {
  id: number;
  clinicalRecordNumber?: string;
  deviceType?: string;
  deviceTypeIcon?: string;
  deviceTypeLabel?: string;
  diabetesType?: string;
  diagnosticDate?: string;
  downloadNoticePeriod?: string;
  expectedDeliverDate?: string;
  healthCareSystemId?: string;
  lastGlucoseDate?: string;
  multilingualDeviceTypeLabel?: string;
  nursingHome?: boolean;
  patientDevices?: any;
  pregnant?: boolean;
  professionalList?: number[];
  relevantClinicalData?: {
    data: string;
    id: number;
    infoTypeIcon: string;
    lastModifiedDate: string;
    patientId: number;
  };
  timeZone?: string;
  units?: string;
  user: {
    id?: number;
    name: string;
    surname: string;
    surname2?: string;
    address?: string;
    fullname: string;
    inactivate?: boolean;
    gender: string;
    phone?: string;
    birthday: string;
    email: string;
    loginId?: number;
    language?: string;
    languageId?: number;
    languageIsoCode?: string;
    languageCountryIsoCode?: string;
    role?: string;
    departmentProfileId?: number;
    profile?: string;
    countryId?: number;
    inactivateReason?: string;
    inactivateComment?: string;
    departmentId?: number;
    centerId?: number;
    areaId?: number;
    locked: boolean;
    lastAccess?: string;
    passwordReset: boolean;
    viewNotifications: boolean;
    countryIsoCode?: string;
    departmentName?: string;
    centerName?: string;
    accessEnum?: string;
    profileId?: number;
    gigyaUid?: string;
    activeInGigya?: boolean;
    hcpIsAccessible: boolean;
    noPhone: boolean;
    fakeMail: boolean;
    headerWelcome: string;
    languageIsoCodeComplete: string;
  };
};
