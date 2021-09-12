import { assocPath, mapObjIndexed, pipe, values } from 'ramda';

import { translate } from 'src/i18n';
import { ALERTS_IDS } from 'src/core/alerts';
import { hasValue } from 'src/utils';

const addValuesToList = (values, list) => assocPath(['values'], values, list);
const addIdToList = (list, id) => assocPath(['id'], id, list);
const forEachKeyAddIdProp = mapObjIndexed(addIdToList);

const { HYPO, UPPER, LOWER } = ALERTS_IDS;

export const addThresholdValuesToMatchingRows = ({
  hypoThresholds,
  hyperThresholds,
  warningThresholds,
}) => alerts => ({
  [HYPO]: addValuesToList(hypoThresholds, alerts[HYPO]),
  [UPPER]: addValuesToList(hyperThresholds, alerts[UPPER]),
  [LOWER]: addValuesToList(warningThresholds, alerts[LOWER]),
});

// Merge selected threshold values from the API with our static text
// Flatten into array for traversal in UI component
export const createRowsFromThresholdValues = ({
  hypoThresholds,
  hyperThresholds,
  warningThresholds,
}) =>
  pipe(
    addThresholdValuesToMatchingRows({
      hypoThresholds,
      hyperThresholds,
      warningThresholds,
    }),
    forEachKeyAddIdProp,
    values,
  );

// We will be receiving only
// mmg/dL data, so we will be converting it to mmol/L too.
// For this purpose we will be using the documented formula:
//
// Formula to calculate mmol/L from mg/dL: mmol/L = mg/dL / 18

export const calculateMmolPerLFromMgPerDL = value => (value / 18).toFixed(1);

export const createMmolPerLString = value =>
  `(${calculateMmolPerLFromMgPerDL(value)} ${translate('units.mmolPerL')})`;

export const createMgPerDLString = value =>
  `${value} ${translate('units.mgPerDL')}`;

export const createThresholdLimitString = value =>
  `${createMgPerDLString(value)} ${createMmolPerLString(value)}`;

export const createThresholdDisplayString = value =>
  value ? createThresholdLimitString(value) : translate('alerts.unavailable');

export const alertsThresholdLimitValidators = {
  [`${HYPO}.thresholdLimit`]: hasValue,
  [`${UPPER}.thresholdLimit`]: hasValue,
  [`${LOWER}.thresholdLimit`]: hasValue,
};
