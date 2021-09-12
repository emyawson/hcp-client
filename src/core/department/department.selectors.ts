import { createSelector } from 'reselect';
import { State } from 'src/app/store/app.types';
import { getIn } from 'src/utils/ramda';

import { ProfileTypes } from './department.types';
import { verifyType } from './department.util';

export const selectDepartmentState = (state: State) => state.department;

export const selectDepartmentLoading = createSelector(
  [selectDepartmentState],
  department => getIn(['isLoading'], department),
);

export const selectDepartmentTypes = createSelector(
  [selectDepartmentState],
  department => getIn(['types'], department),
);

export const selectHasBasic = createSelector(
  [selectDepartmentTypes],
  types =>
    types.filter(type => verifyType(type)(ProfileTypes.basic)).length > 0,
);

export const selectHasPickup = createSelector(
  [selectDepartmentTypes],
  types =>
    types.filter(type => verifyType(type)(ProfileTypes.pickup)).length > 0,
);

export const selectHasHomeDelivery = createSelector(
  [selectDepartmentTypes],
  types =>
    types.filter(type => verifyType(type)(ProfileTypes.homeDelivery)).length >
    0,
);
