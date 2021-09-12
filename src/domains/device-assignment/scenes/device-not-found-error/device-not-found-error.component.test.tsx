import { shallow } from 'enzyme';
import * as React from 'react';

import { DeviceNotFoundErrorComponent } from './device-not-found-error.component';

const componentProps = {
  onCancel: () => '',
  deviceInfo: {
    modelDevice: '',
    serialNumber: '',
    brandName: '',
  },
  assignedPatientName: '',
};

describe('Device not found error test suite', () => {
  it('Render correctly', () => {
    const wrapper = shallow(
      <DeviceNotFoundErrorComponent {...componentProps} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
