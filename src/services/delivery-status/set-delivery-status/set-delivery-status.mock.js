export const mockSetDeliveryStatusData = {
  numberOfStrips: 50,
  trafficLightStatus: {
    id: 1,
    status: 'gray',
    dateCalculated: '2017-12-01T18:21:03.182Z',
    conditions: [
      {
        type: 'CONSUMPTION',
        pass: false,
        value: {
          threshold: 1,
          amount: 1,
        },
      },
    ],
    forced: true,
  },
};
