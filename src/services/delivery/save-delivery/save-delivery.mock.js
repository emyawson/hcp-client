export const mockSaveDeliveryResponse = {
  dateCalculated: '2018-02-13T17:55:03.689+00:00',
  id: 'd2d30e09-86f1-43b6-9b68-1de190742c7f',
  prescriptionId: '354ef1ac-d17b-4521-b3a2-72d66f5fbc2a',
  stripModelId: 1,
  stripsDelivered: 50,
  trafficLightStatus: {
    id: 123,
    status: 'grey',
    dateCalculated: '2017-12-01T18:21:03.182Z',
    conditions: [
      {
        type: 'CONSUMPTION',
        pass: true,
        value: {
          threshold: 30,
          amount: 20,
        },
      },
    ],
    forced: false,
  },
};
