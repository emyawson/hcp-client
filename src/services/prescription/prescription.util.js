import { reject, pipe, isNil, pathOr } from 'ramda';

import { stringToFrequency } from 'src/services/frequencies/frequencies.utils';
import {
  jsDateToISOString,
  isDateStringValid,
  toGMTZone,
  toJSDate,
  toStartOfDay,
  convertJSDate,
  hasValue,
} from 'src/utils';

export const transformJSONToPrescription = prescription => {
  if (hasValue(prescription)) {
    const {
      id,
      prescriptionType,
      quantity,
      frequency,
      stripModelId,
      therapyId,
      clinicGuideId,
      period,
      patientId,
    } = prescription;
    const reason = pathOr(null, ['reason'], prescription);
    const startDate = pathOr(null, ['startDate'], prescription);
    const endDate = pathOr(null, ['endDate'], prescription);
    return {
      id,
      patientId,
      prescriptionType,
      period,
      quantity,
      frequency,
      therapy: therapyId,
      stripModel: stripModelId,
      clinicGuide: clinicGuideId,
      reason,
      startDate,
      endDate,
    };
  }
  return null;
};

export const transformJSONToPrescriptions = results => {
  if (results) {
    const { active, permanent, temporary } = results;
    return {
      active,
      permanent: transformJSONToPrescription(permanent),
      temporary: transformJSONToPrescription(temporary),
    };
  }
};

export const convertJSDateToGMTString = pipe(
  convertJSDate,
  toGMTZone,
  toStartOfDay,
  toJSDate,
  jsDateToISOString,
);

const isJSDate = date => date instanceof Date;

export const formatPrescriptionDate = date =>
  isJSDate(date)
    ? convertJSDateToGMTString(date)
    : isDateStringValid(date)
      ? date
      : null;

export const transformPrescriptionToJSON = ({
  prescriptionType,
  period,
  therapy,
  clinicGuide,
  frequency,
  stripModel,
  quantity,
  reason = null,
  startDate = null,
  endDate = null,
}) => ({
  prescriptionType,
  period,
  quantity,
  reason,
  startDate: startDate && formatPrescriptionDate(startDate),
  endDate: endDate && formatPrescriptionDate(endDate),
  stripModelId: stripModel,
  therapyId: therapy,
  clinicGuideId: clinicGuide,
  frequency: stringToFrequency(frequency),
});

export const removeEmptyFields = reject(isNil);

export const transformPrescriptionToJSONWithSanitization = pipe(
  transformPrescriptionToJSON,
  removeEmptyFields,
);
