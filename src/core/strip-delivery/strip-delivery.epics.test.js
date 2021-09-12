import { ActionsObservable } from 'redux-observable';

import { createLegacyMockStore } from 'src/test';
import { MODAL_ACTIONS, MODAL_TYPES } from 'src/core/modal';

import {
  getDeliveryStatusEpic,
  createPatientStatusNotificationModalEpic,
  getDeliveryEpic,
  createSendPatientStatusModalEpic,
} from './strip-delivery.epics';
import {
  GET_DELIVERY_STATUS_REQUEST,
  GET_DELIVERY_REQUEST,
  GET_LAST_DELIVERY_STATUS_REQUEST,
  TRAFFIC_LIGHT_STATES,
} from './strip-delivery.constants';
import {
  shouldTriggerSendPatientStatusModal,
  shouldTriggerNotificationModal,
} from './strip-delivery.utils';

jest.mock('./strip-delivery.utils');

describe('Core strip delivery epics', () => {
  let store = null;
  const mockDeliveryStatusResponse = {
    numberOfStripsToDeliver: 100,
    trafficLightStatus: {},
    dateCalculated: '2018-03-26T00:00:00.000Z',
    forced: false,
    status: 'orange',
    id: 'eade0468-5137-4a58-870e-d499d856e83e',
    comment: 'this is a comment',
    commentStatus: 'normal',
  };
  const mockDeliveryResponse = {
    id: 'c304bb90-399f-4ab3-8370-1ffce3c2259b',
    lastCollectedDate: '2018-04-12T18:21:22.258Z',
    prescriptionId: 'f6c5d4ac-1e5a-463d-aa6a-bf18d59c6aed',
    stripModelId: 422,
    stripsDelivered: 100,
    trafficLightStatus: {},
  };

  beforeEach(() => {
    store = createLegacyMockStore({
      state: {
        session: {},
      },
    });
  });

  describe('Get delivery status epic', () => {
    it('Dispatches the correct action on successful service call', done => {
      expect.assertions(1);

      const mockService = () => Promise.resolve(mockDeliveryStatusResponse);
      const action$ = ActionsObservable.of({
        type: GET_DELIVERY_STATUS_REQUEST.START,
        payload: {
          patientId: '123',
          hasForceStatus: false,
          hasModal: false,
          modalComponent: null,
        },
      });
      getDeliveryStatusEpic(mockService)(action$, store).subscribe(
        actualOutputAction => {
          expect(actualOutputAction).toEqual(
            expect.objectContaining({
              type: GET_DELIVERY_STATUS_REQUEST.SUCCESS,
              payload: expect.objectContaining({
                ...mockDeliveryStatusResponse,
              }),
            }),
          );
          done();
        },
      );
    });
    it('Dispatches error action on unsuccessful service call', done => {
      expect.assertions(1);

      const mockService = () => Promise.reject('Error');
      const action$ = ActionsObservable.of({
        type: GET_DELIVERY_STATUS_REQUEST.START,
        payload: {},
      });
      getDeliveryStatusEpic(mockService)(action$, store).subscribe(
        actualOutputAction => {
          expect(actualOutputAction).toEqual(
            expect.objectContaining({
              type: GET_DELIVERY_STATUS_REQUEST.ERROR,
            }),
          );
          done();
        },
      );
    });
  });

  describe('Get delivery epic', () => {
    it('Dispatches the correct action on successful service call', done => {
      expect.assertions(1);

      const mockService = () => Promise.resolve(mockDeliveryResponse);
      const action$ = ActionsObservable.of({
        type: GET_DELIVERY_REQUEST.START,
        payload: {
          patientId: '123',
        },
      });
      getDeliveryEpic(mockService)(action$, store).subscribe(
        actualOutputAction => {
          expect(actualOutputAction).toEqual(
            expect.objectContaining({
              type: GET_DELIVERY_REQUEST.SUCCESS,
              payload: expect.objectContaining({
                ...mockDeliveryResponse,
              }),
            }),
          );
          done();
        },
      );
    });
    it('Dispatches error action on unsuccessful service call', done => {
      expect.assertions(1);

      const mockService = () => Promise.reject('Error');
      const action$ = ActionsObservable.of({
        type: GET_DELIVERY_REQUEST.START,
        payload: {},
      });
      getDeliveryEpic(mockService)(action$, store).subscribe(
        actualOutputAction => {
          expect(actualOutputAction).toEqual(
            expect.objectContaining({
              type: GET_DELIVERY_REQUEST.ERROR,
            }),
          );
          done();
        },
      );
    });
  });

  describe('Create send patient status modal epic', () => {
    it('Dispatches create modal action if all conditions are met', done => {
      expect.assertions(1);

      shouldTriggerSendPatientStatusModal.mockReturnValue(true);
      const action$ = ActionsObservable.of({
        type: GET_DELIVERY_STATUS_REQUEST.SUCCESS,
        payload: {
          hasModal: true,
          trafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT,
          hasForceStatus: false,
        },
      });
      createSendPatientStatusModalEpic()(action$, store).subscribe(
        actualOutputAction => {
          expect(actualOutputAction).toEqual(
            expect.objectContaining({
              type: MODAL_ACTIONS.ADD_MODAL,
              payload: {
                key: MODAL_TYPES.CUSTOM,
                data: expect.any(Object),
              },
            }),
          );
          done();
        },
      );
    });
  });

  describe('Create patient status notification modal epic', () => {
    it('Dispatches create modal action if all conditions are met', done => {
      expect.assertions(1);

      shouldTriggerNotificationModal.mockReturnValue(true);
      const action$ = ActionsObservable.of({
        type: GET_LAST_DELIVERY_STATUS_REQUEST.SUCCESS,
        payload: {
          hasModal: true,
          trafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT,
          hasForceStatus: true,
        },
      });
      createPatientStatusNotificationModalEpic()(action$, store).subscribe(
        actualOutputAction => {
          expect(actualOutputAction).toEqual(
            expect.objectContaining({
              type: MODAL_ACTIONS.ADD_MODAL,
              payload: {
                key: MODAL_TYPES.CUSTOM,
                data: expect.any(Object),
              },
            }),
          );
          done();
        },
      );
    });
  });
});
