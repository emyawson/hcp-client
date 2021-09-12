import { createStructuredSelector } from 'reselect';

import {
  selectEC6DepartmentId,
  selectEC6UserId,
} from 'src/core/user/user.selectors';

export const editPatientConnector = createStructuredSelector({
  departmentId: selectEC6DepartmentId,
  professionalId: selectEC6UserId,
});
