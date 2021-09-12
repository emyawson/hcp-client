import type { GetDeliveryInfo } from 'src/services';

type GetDeliveryStatusRequestSuccessAction = {
  type: 'GET_DELIVERY_SUCCESS',
  payload: GetDeliveryInfo,
};

export type Action = GetDeliveryStatusRequestSuccessAction;

export type State = {
  stripDeliveryInfo: StripDeliveryInfo | Map<any>,
  isFetchingStripDeliveryInfo: boolean,
};
