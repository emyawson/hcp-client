export const mockResponse = {
  resultDescription: 'getDepartmentProfilesOK',
  model: [
    {
      id: 6,
      department: {
        id: 1,
        name: 'Hospital Clínic',
        sapCodePayer: 'sapcodepy_dp1',
        sapCodeClient: null,
      },
      profile: {
        id: 41,
        name: null,
        role: 'PATIENT',
        label: 'Standard',
        code: 'STANDARD',
        mandatory: true,
      },
    },
    {
      id: 9,
      department: {
        id: 1,
        name: 'Hospital Endocrinologia',
        sapCodePayer: 'sapcodepy_dp1',
        sapCodeClient: null,
      },
      profile: {
        id: 71,
        name: null,
        role: 'PROFESSIONAL',
        label: 'HCP Master',
        code: 'HCP_MASTER',
        mandatory: true,
      },
    },
    {
      id: 10,
      department: {
        id: 1,
        name: 'Hospital Clínic Endocrinologia1',
        sapCodePayer: 'sapcodepy_dp1',
        sapCodeClient: null,
      },
      profile: {
        id: 81,
        name: null,
        role: 'PROFESSIONAL',
        label: 'Administrative',
        code: 'ADMINISTRATIVE',
        mandatory: true,
      },
    },
    {
      id: 32596,
      department: {
        id: 1,
        name: 'Hospital Clínic Endocrinologia',
        sapCodePayer: 'sapcodepy_dp1',
        sapCodeClient: null,
      },
      profile: {
        id: 105,
        name: null,
        role: 'PATIENT',
        label: 'Standard with Home Delivery',
        code: 'STANDARD_WITH_HOME_DELIVERY',
        mandatory: false,
      },
    },
    {
      id: 46976,
      department: {
        id: 1,
        name: 'Hospital Clínic Endocrinologia',
        sapCodePayer: 'sapcodepy_dp1',
        sapCodeClient: null,
      },
      profile: {
        id: 104,
        name: null,
        role: 'PATIENT',
        label: 'Standard with Strip Management',
        code: 'STANDARD_WITH_STRIP_MANAGEMENT',
        mandatory: false,
      },
    },
  ],
};

export const mockError = {
  resultDescription: 'INTERNAL_SERVER_ERROR',
  error: [{ error: 'User already exist!' }],
};
