import * as enzyme from 'enzyme';
import * as React from 'react';

import { ConfirmAssignmentComponent } from './confirm-assignment.component';
import { CancelButton } from '../device-assignment/device-assignment.style';
import { ChangePatientButton } from './confirm-assignment.style';
import { Button } from 'src/components/button';

describe('Confirm assignment component test suite', () => {
  const mockCancel = jest.fn().mockName('change mock');
  const mockConfirm = jest.fn().mockName('confirm mock');
  const mockChangePatient = jest.fn().mockName('change patient mock');
  const mockProps = {
    deviceInfo: {
      id: '1234',
      modelDevice: 'Model',
      serialNumber: 'serialno',
      brandName: 'Accu check',
      description: 'desc',
      formatName: 'format',
      reference: 'ref',
    },
    selectedPatient: {
      birthDate: '12/12/1970',
      fullName: 'A B',
      healthCareSystemId: 'sysid123',
      id: 1234,
    },
    onCancel: mockCancel,
    onConfirmAssignment: mockConfirm,
    onChangePatient: mockChangePatient,
    currentStep: 2,
    dataIsUnavailable: false,
    hasConfirmedDevice: true,
    isComplete: false,
    isUpdatingAssociation: false,
    confirmDeviceAssignment: () => null,
    shouldDisplayCreatePatientView: false,
    match: {},
  };
  it('Should render without crashing', () => {
    const tree = enzyme.shallow(<ConfirmAssignmentComponent {...mockProps} />);
    expect(tree).toHaveLength(1);
  });
  it('Should trigger cancel action on button click', () => {
    const tree = enzyme.mount(<ConfirmAssignmentComponent {...mockProps} />);
    mockCancel.mockClear();
    tree
      .find(CancelButton)
      .at(0)
      .simulate('click');
    expect(mockCancel).toHaveBeenCalled();
  });
  it('Should trigger patient change action on button click', () => {
    const tree = enzyme.mount(<ConfirmAssignmentComponent {...mockProps} />);
    mockChangePatient.mockClear();
    tree
      .find(Button)
      .at(0)
      .simulate('click');
    expect(mockChangePatient).toHaveBeenCalled();
  });
  it('Should trigger confirm action on button click', () => {
    const tree = enzyme.mount(<ConfirmAssignmentComponent {...mockProps} />);
    mockConfirm.mockClear();
    tree
      .find(Button)
      .at(1)
      .simulate('click');
    expect(mockConfirm).toHaveBeenCalled();
  });
  it('Should trigger patient change action on header button click', () => {
    const tree = enzyme.mount(<ConfirmAssignmentComponent {...mockProps} />);
    mockChangePatient.mockClear();
    tree
      .find(ChangePatientButton)
      .at(0)
      .simulate('click');
    expect(mockChangePatient).toHaveBeenCalled();
  });
});
