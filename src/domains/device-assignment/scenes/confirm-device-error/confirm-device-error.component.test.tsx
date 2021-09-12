import { shallow } from 'enzyme';
import * as React from 'react';

import { ConfirmDeviceErrorComponent } from './confirm-device-error.component';

const componentProps = {
  onCancel: () => '',
  deviceInfo: {
    modelDevice: '',
    serialNumber: '',
    brandName: '',
  },
  assignedPatientName: '',
};

describe('Confirm device error test suite', () => {
  it('Render correctly', () => {
    const wrapper = shallow(
      <ConfirmDeviceErrorComponent {...componentProps} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
