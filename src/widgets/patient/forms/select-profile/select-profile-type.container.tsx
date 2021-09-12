import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  selectHasBasic,
  selectHasHomeDelivery,
  selectHasPickup,
} from 'src/core/department';
import { selectDepartmentLoading } from 'src/core/department/department.selectors';

import { SelectProfileTypeComponent } from './select-profile-type.component';
import {
  SelectProfileTypeExternalProps,
  SelectProfileTypeMappedFromDispatch,
  SelectProfileTypeProps,
  SelectProfileTypePropsMappedFromState,
} from './select-profile-type.types';
import { selectProfileType } from './store/select-profile-type.selectors';

const selectProfileTypeConnector = createStructuredSelector({
  isLoading: selectDepartmentLoading,
  profileType: selectProfileType,
  options: createStructuredSelector({
    hasBasic: selectHasBasic,
    hasPickup: selectHasPickup,
    hasHomeDelivery: selectHasHomeDelivery,
  }),
});

export const SelectProfileType = compose<
  SelectProfileTypeProps,
  SelectProfileTypeExternalProps
>(
  connect<
    SelectProfileTypePropsMappedFromState,
    SelectProfileTypeMappedFromDispatch
  >(selectProfileTypeConnector),
)(SelectProfileTypeComponent);
