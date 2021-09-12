import { PERMISSIONS } from 'src/core/permissions/permissions.constants';

export const PROFILE_MANAGEMENT_ACTIONS = [
  {
    localizedStringKeyName: 'updateDetails',
    url: '/profile/edit',
    permissions: [],
  },
  {
    localizedStringKeyName: 'changePassword',
    url: '/profile/change-password',
    permissions: [],
  },
  {
    localizedStringKeyName: 'addProfessional',
    url: '/professional/create',
    permissions: [PERMISSIONS.CREATE_PROFESSIONAL],
  },
  {
    localizedStringKeyName: 'defaultGraphicSettings',
    url: '/professional/default-graphic-settings',
    permissions: [PERMISSIONS.USER_SHOW_GRAPHIC_CONFIG],
  },
];
