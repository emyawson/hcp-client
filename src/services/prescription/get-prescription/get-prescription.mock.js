const randomPrescriptionId = () => Math.floor(Math.random() * 9999999);
export const mockPermanentPrescriptionData = {
  id: `${randomPrescriptionId()}`,
  clinicGuideId: '6f888985-7c41-4b43-9ed4-e2d4ca2de79f',
  dateCreated: '2018-04-17T19:25:43.258Z',
  frequency: { duration: 1, unit: 'months' },
  patientId: 10250,
  period: 'days',
  prescriptionType: 'permanent',
  quantity: 3,
  stripModelId: 10613,
  stripsToConsume: 90,
  therapyId: 'ba2de9c7-c576-4f43-a9bb-c0ffed6cbb92',
};

export const mockCurrentTemporaryPrescriptionData = {
  id: `${randomPrescriptionId()}`,
  clinicGuideId: '6f888985-7c41-4b43-9ed4-e2d4ca2de79f',
  dateCreated: '2017-12-12T00:00:00.000Z',
  frequency: { duration: 2, unit: 'months' },
  nextDeliveryDate: '2018-01-11T00:00:00.000Z',
  patientId: 22,
  period: 'days',
  prescriptionType: 'temporary',
  quantity: 3,
  stripModelId: 10613,
  stripsToConsume: 183,
  therapyId: 'ba2de9c7-c576-4f43-a9bb-c0ffed6cbb92',
  startDate: '2018-05-13 0:00:00',
  endDate: '2018-06-30 0:00:00',
  reason: '6f2c52fa-3e43-4f3e-9203-3695df3dafe7',
};

export const mockCurrentPrescriptionsData = {
  active: 'permanent',
  permanent: mockPermanentPrescriptionData,
  temporary: mockCurrentTemporaryPrescriptionData,
};
