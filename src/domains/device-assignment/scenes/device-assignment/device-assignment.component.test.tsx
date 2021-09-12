import * as enzyme from 'enzyme';
import * as React from 'react';

import { DeviceAssignmentComponent } from './device-assignment.component';

describe('Device assignment component test suite', () => {
  const mockProps = {
    cancelDeviceAssignment: () => null,
    deviceInfo: {
      id: '1234',
      modelDevice: 'Model',
      serialNumber: 'serialno',
      brandName: 'Accu check',
      description: 'desc',
      formatName: 'format',
      reference: 'ref',
    },
    getDeviceAssociation: () => null,
    hasConfirmedDevice: false,
    match: {},
    selectedPatient: {},
    currentStep: -1,
    dataIsUnavailable: false,
  };
  it('should render without crashing', () => {
    const tree = enzyme.shallow(<DeviceAssignmentComponent {...mockProps} />);
    expect(tree).toHaveLength(1);
  });
});
