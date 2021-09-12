import { Config } from 'src/core';
import { createAuthHeader, getJSON, convertISO } from 'src/utils';

const { REACT_APP_API_VERSION, REACT_APP_API_ROOT } = Config;

export const ClinicalDataLoaderImpl = (
  { patientId, startDate, endDate },
  token,
) =>
  getJSON(
    `/${REACT_APP_API_ROOT}/${REACT_APP_API_VERSION}/patients/${patientId}/clinical-data?startDate=${startDate}&endDate=${endDate}`,
    {},
    {
      Authorization: createAuthHeader(token),
    },
  );

export const ClinicalDataTransformImpl = results => {
  const measurements = results.glucoseValues.map(
    ({
      afterMeal,
      beforeMeal,
      carbohydrates,
      date,
      flagAboveTargetRange,
      flagBelowTargetRange,
      glucose,
      hypoSymptoms,
      control,
      insulin1,
    }) => ({
      aboveTargetRange: flagAboveTargetRange,
      afterMeal,
      beforeMeal,
      belowTargetRange: flagBelowTargetRange,
      carbohydrates,
      date: convertISO(date).toJSDate(),
      hypoSymptoms,
      value: glucose,
      control,
      insulin1,
    }),
  );

  // USE THIS CODE FOR INSULIN DATA FROM MIDDLEWARE
  // (INSULIN DATA ONLY AVAILABLE IN DEV INTEGRATION ENV)
  const basals = results.newData.basals.map(
    ({
      date,
      cbrf,
      profile,
      remark,
      virtual,
      tsb,
      tsbDiffMins,
      tbrdec,
      tbrinc,
    }) => ({
      date: convertISO(date).toJSDate(),
      cbrf,
      profile,
      remark,
      virtual,
      tsb,
      tsbDiffMins,
      tbrdec,
      tbrinc,
    }),
  );

  const bolus = results.newData.bolus.map(
    ({ date, value, remark, registerType, bolusType }) => ({
      date: convertISO(date).toJSDate(),
      value,
      remark,
      registerType,
      bolusType,
    }),
  );

  return { measurements, insulin: { basals, bolus } };
};

export const ClinicalDataServiceImpl = (load, transform) => (query, token) =>
  load(query, token).then(transform);
