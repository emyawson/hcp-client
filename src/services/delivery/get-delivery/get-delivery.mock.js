export const getDeliveryMockData = {
  id: '4b8b4cb4-64b0-4c60-bddc-e5017a56d0e0',
  lastCollectedDate: '2018-03-23T12:38:03.227Z',
  prescriptionId: '930f50ff-e8cb-4592-96ab-22c1ca310f6d',
  stripModelId: 10606,
  stripsDelivered: 50,
  trafficLightStatus: {
    conditions: [
      { pass: true, threshold: 0, amount: 0, type: 'HYPO_ALERT' },
      { pass: true, threshold: 0, amount: 0, type: 'HYPER_ALERT' },
      { pass: true, threshold: 0, amount: 0, type: 'WARNING_ALERT' },
      {
        pass: true,
        threshold: 42,
        amount: 0,
        percentConsumed: 0,
        type: 'CONSUMPTION',
      },
    ],
    id: null,
    status: 'orange',
  },
};
