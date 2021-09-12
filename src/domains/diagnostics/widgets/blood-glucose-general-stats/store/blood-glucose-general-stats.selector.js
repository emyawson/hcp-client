import { createStructuredSelector, createSelector } from 'reselect';
import {
  descend,
  isEmpty,
  isNil,
  map,
  pipe,
  prop,
  sortWith,
  path,
} from 'ramda';

import {
  selectPatientDevices,
  selectIsLoading,
} from 'src/domains/diagnostics/store/selectors';

const selectDeviceName = path(['deviceModel', 'name']);
const selectDeviceType = path(['deviceModel', 'materialType', 'name']);
const selectLastDownloadDate = path(['lastDownloadDate']);
const selectIdDevice = path(['id']);

const transformDeviceShape = device => ({
  id: selectIdDevice(device),
  name: selectDeviceName(device),
  lastDownloadDate: selectLastDownloadDate(device),
  type: selectDeviceType(device),
});

const selectDeviceDetails = createSelector(selectPatientDevices, devices => {
  if (!isNil(devices) && !isEmpty(devices)) {
    return pipe(map(transformDeviceShape))(devices);
  } else {
    return [];
  }
});

const sortByDate = sortWith([descend(prop('lastDownloadDate'))]);

const orderDeviceDetailsByDateDesc = createSelector(
  selectDeviceDetails,
  devices => (!isEmpty(devices) ? sortByDate(devices) : []),
);

const selectHasData = createSelector(
  selectPatientDevices,
  selectIsLoading,
  (devices, isLoading) => isLoading || !isEmpty(devices),
);

export const BloodGlucoseGeneralStatsConnector = createStructuredSelector({
  deviceDetails: orderDeviceDetailsByDateDesc,
  hasData: selectHasData,
  isLoading: selectIsLoading,
});
