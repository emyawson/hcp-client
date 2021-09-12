export const mockGetDeliveryStatusResponse = {
  numberOfStripsToDeliver: 100,
  trafficLightStatus: {
    conditions: [
      { events: {}, type: 'ActiveThresholdEventCounts' },
      {
        explanation:
          'Patient has consumed less than 70%, or more than 100% of prescription',
        type: 'explanation',
      },
      {
        isActive: false,
        pass: true,
        type: 'HYPER_ALERT',
        value: { amount: 12, threshold: 0 },
      },
      {
        isActive: false,
        pass: true,
        type: 'HYPO_ALERT',
        value: { amount: 0, threshold: 0 },
      },
      {
        isActive: false,
        pass: true,
        type: 'WARNING_ALERT',
        value: { amount: 0, threshold: 0 },
      },
      { pass: true, type: 'CONSUMPTION', value: { amount: 56, threshold: 42 } },
    ],
    dateCalculated: '2018-04-03T19:12:27.697Z',
    forced: false,
    id: 'eade0468-5137-4a58-870e-d499d856e83e',
    status: 'orange',
    comment: 'this is a comment',
    commentStatus: 'normal',
  },
};
