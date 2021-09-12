import { getDynamicConfig, getJSON } from 'src/utils';

import { createService } from '../service';
import { Transform } from '../service.types';

import {
  PermissionData,
  PermissionOptions,
  PermissionsService,
} from './permissions.types';

const { REACT_APP_API_ROOT, REACT_APP_API_VERSION } = getDynamicConfig();

const permissionsTransform: Transform<PermissionData> = (
  x: any,
): PermissionData => x;
const permissionsRequest = ({
  patientId,
  token,
}: PermissionOptions): Promise<PermissionData> =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/permissions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const permissionsService: PermissionsService = createService(
  permissionsRequest,
  permissionsTransform,
);
