export type ProfileType = {
  department: {
    id: number;
    name: string;
    sapCodeClient: string;
    sapCodePayer: string;
  };
  id: number;
  profile: {
    code: string;
    id: number;
    label: string;
    mandatory: true;
    name: string;
    role: string;
  };
};

export type ProfileTypesParams = {
  departmentId: number;
};

export type ProfileTypesResponse = {
  model: ProfileType[];
};

export type ProfileTypesErrorResponse = {
  error: Array<{ [key: string]: string }>;
};

export type ProfileTypesTransform = (
  data: ProfileTypesResponse,
) => ProfileType[];

export type ProfileTypesServiceImplFactoryType = (
  load,
  transform: ProfileTypesTransform,
) => ProfileTypesServiceImplType;

export type ProfileTypesServiceImplType = (
  query: ProfileTypesParams,
  token: string,
) => Promise<ProfileType[]>;
