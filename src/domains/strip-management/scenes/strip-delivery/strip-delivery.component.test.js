import { shallow } from 'enzyme';
import React from 'react';

import { TRAFFIC_LIGHT_STATES } from 'src/core/strip-delivery';

import { StripDelivery } from './strip-delivery.component';

describe('Strip delivery component', () => {
  const mockProps = {
    numberOfStripsToDeliver: 1,
    lastCollectedDate: '2017-11-29T15:10:41.00',
    nextDeliveryDate: '2017-11-29T15:10:41.00',
    currentPrescription: {},
    saveDeliveryRequest: () => {},
    match: {},
    trafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER,
    trafficLightStatusConditions: {},
    setDeliveryStatusRequest: () => {},
    getDeliveryStatusRequest: () => {},
    patientId: 1,
    forceTrafficStatus: {},
    patientDelivery: {},
    frequency: 'twoWeeks',
    stripModelId: 1,
    stripModelName: 'Accuchek Aviva',
    stripsCanBeDelivered: true,
    deliverStripsToPatient: () => {},
    patientStock: {},
    submitLostStripsRequest: () => {},
    submitManualDeliveryRequest: () => {},
    hasActivePrescription: true,
    hasStripDeliveryData: true,
    prescriptionType: 'permanent',
    quantity: 3,
    period: 'days',
    getDeliveryHasError: false,
    getPrescriptionHasError: false,
    patientStripStock: 2,
  };

  it('renders correctly', () => {
    const wrapper = shallow(<StripDelivery {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
