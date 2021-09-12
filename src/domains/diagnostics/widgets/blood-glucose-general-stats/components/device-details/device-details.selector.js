import { createStructuredSelector, createSelector } from 'reselect';
import { descend, is, isEmpty, isNil, path, prop, sortWith } from 'ramda';

import { selectProfileMinutes } from 'src/domains/diagnostics/scenes/insulin/insulin.selector.js';
import { DEVICE_DETAILS } from 'src/domains/diagnostics/constants/device.constants';
import {
  selectMeasurementUnit,
  selectNumberOfDaysInDateRange,
  selectBasalsInDateSliderRange,
  selectPatientDevices,
} from 'src/domains/diagnostics/store/selectors';

import { selectAllBGStats } from '../../store/blood-glucose-general-stats-bg.selector';
import { selectAllBolusStats } from '../../store/blood-glucose-general-stats-bolus.selector';

const selectDeviceName = path(['deviceModel', 'name']);
const selectDeviceSerial = path(['serialNumber']);
const selectDeviceType = path(['deviceModel', 'materialType', 'name']);
const selectLastReading = path(['lastDownloadDate']);
const selectIdDevice = path(['id']);

const transformDeviceShape = device => ({
  id: selectIdDevice(device),
  name: selectDeviceName(device),
  serial: selectDeviceSerial(device),
  lastReading: selectLastReading(device),
  type: selectDeviceType(device),
});

const selectDeviceDetails = createSelector(selectPatientDevices, devices => {
  if (!isNil(devices) && !isEmpty(devices)) {
    return devices.map(transformDeviceShape);
  } else {
    return [];
  }
});

const sortByDate = sortWith([descend(prop('lastReading'))]);

const orderDeviceDetailsByDateDesc = createSelector(
  selectDeviceDetails,
  devices => (!isEmpty(devices) ? sortByDate(devices) : []),
);

const selectNotNullRemarks = createSelector(
  selectBasalsInDateSliderRange,
  basals => basals.filter(basal => !isNil(basal.basalRemark)),
);

const selectTbrDecCount = createSelector(
  selectBasalsInDateSliderRange,
  basals => basals.filter(basal => !isNil(basal.basalTbrdec)).length,
);

const selectTbrIncCount = createSelector(
  selectBasalsInDateSliderRange,
  basals => basals.filter(basal => !isNil(basal.basalTbrinc)).length,
);

const selectStopMinutesInRange = createSelector(
  selectProfileMinutes,
  stopObject => path(['stop', 'minutes'], stopObject),
);

const selectProfileChangeCount = createSelector(
  selectNotNullRemarks,
  basals => {
    const re = DEVICE_DETAILS.RE_CHANGE_PROFILE;
    return basals.filter(basal => re.test(basal.basalRemark)).length;
  },
);

export const selectBasalRateProfileChangePerWeek = createSelector(
  selectProfileChangeCount,
  selectNumberOfDaysInDateRange,
  (profileChangeCount, numberOfDays) =>
    is(Number, numberOfDays) && numberOfDays > 0
      ? ((profileChangeCount / numberOfDays) * 7).toFixed(1)
      : 0,
);

const selectTotalMinutesInDateRange = createSelector(
  selectNumberOfDaysInDateRange,
  totalDays => 1440 * totalDays,
);

export const selectPercentageOfStopEvents = createSelector(
  selectStopMinutesInRange,
  selectTotalMinutesInDateRange,
  (totalStopMinutes, totalMinutes) =>
    totalMinutes > 0 && totalStopMinutes > 0
      ? Math.round(100 * (totalStopMinutes / totalMinutes))
      : 0,
);

export const DeviceDetailsConnector = createStructuredSelector({
  deviceData: orderDeviceDetailsByDateDesc,
  deviceStats: selectAllBGStats,
  bolusStats: selectAllBolusStats,
  bloodGlucoseMeasurementUnit: selectMeasurementUnit,
  basalDataMetrics: createStructuredSelector({
    tbrDecreaseCount: selectTbrDecCount,
    tbrIncreaseCount: selectTbrIncCount,
    percentageOfStopEvents: selectPercentageOfStopEvents,
    profileChangeCount: selectProfileChangeCount,
    daysinDateRange: selectNumberOfDaysInDateRange,
    basalRateProfileChangePerWeek: selectBasalRateProfileChangePerWeek,
  }),
});
