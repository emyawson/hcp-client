import { or, equals, gt, and } from 'ramda';

import { TRAFFIC_LIGHT_STATES } from 'src/core';
import { translate } from 'src/i18n';
import { hasValue } from 'src/utils';

export const checkStripsCanBeDelivered = (numberOfTubesToDeliver, status) =>
  and(
    gt(numberOfTubesToDeliver, 0),
    or(
      equals(status, TRAFFIC_LIGHT_STATES.DELIVER),
      equals(status, TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT),
    ),
  );

export const createStripsToDeliverStr = numberOfStripsToDeliver => {
  if (!hasValue(numberOfStripsToDeliver))
    return translate('stripDelivery.empty.stripsToDeliver');
  const unitType = numberOfStripsToDeliver === 1 ? 'singular' : 'plural';
  return `${numberOfStripsToDeliver} ${translate(
    `stripDelivery.unitsTubesSmallStatusCard.${unitType}`,
  )}`;
};

export const createNextDeliveryStr = nextDeliveryDate =>
  nextDeliveryDate || translate('stripDelivery.empty.nextDeliveryDate');
