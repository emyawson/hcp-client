import { PERMISSIONS } from 'src/core/permissions/permissions.constants';

export const PATIENT_SUMMARY_ACTIONS = [
  {
    localizedStringKeyName: 'editPatient',
    url: '/edit',
    permissions: [PERMISSIONS.EDIT_PATIENT],
  },
  {
    localizedStringKeyName: 'timePeriods',
    url: '/time-periods',
    permissions: [PERMISSIONS.TIME_BLOCKS_MANAGEMENT],
  },
  {
    localizedStringKeyName: 'listTreatments',
    url: '/treatments',
    permissions: [PERMISSIONS.TREATMENT_LIST],
  },
  {
    localizedStringKeyName: 'graphicSettings',
    url: '/graph-settings',
    permissions: [PERMISSIONS.USER_SHOW_GRAPHIC_CONFIG],
  },
  {
    localizedStringKeyName: 'listDevices',
    url: '/devices',
    permissions: [PERMISSIONS.PATIENT_DEVICES],
  },
  {
    localizedStringKeyName: 'deactivatePatient',
    url: '/deactivate',
    permissions: [PERMISSIONS.PATIENT_MANAGEMENT_DELETE],
  },
];
