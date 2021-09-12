import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  cancelConfirmedDevice,
  cancelDeviceAssignment,
  confirmDevice,
  selectDeviceAssignmentPatient,
  toggleCreatePatientView,
} from 'src/core';
import { search } from 'src/core/patient-search';
import { mapDispatchers } from 'src/utils';

import { selectPatientForDeviceAssignmentConnector } from '../device-assignment/device-assignment.selectors';

import { SelectPatientComponent } from './select-patient.component';
import {
  SelectPatientContainerProps,
  SelectPatientProps,
} from './select-patient.types';

const dispatchers = mapDispatchers({
  onCancel: cancelDeviceAssignment,
  onConfirm: confirmDevice,
  onSearch: search,
  onSelectPatient: selectDeviceAssignmentPatient,
  toggleCreatePatientView,
  onGoBack: cancelConfirmedDevice,
});

const withSearchOnMount = lifecycle<
  SelectPatientProps,
  SelectPatientContainerProps
>({
  componentDidMount() {
    // TODO: Replace with most recent patients endpoint once completed
    this.props.onSearch({ patientID: '', fullName: 'a' });
  },
});

export const SelectPatientContainer = compose<
  SelectPatientProps,
  SelectPatientContainerProps
>(
  connect(
    selectPatientForDeviceAssignmentConnector,
    dispatchers,
  ),
  withSearchOnMount,
)(SelectPatientComponent);
