import { shallow } from 'enzyme';
import React from 'react';

import { PatientSearchWidget } from './patient-search.component';

describe('patient-search widget component', () => {
  const patients = [
    {
      birthDate: '12/11/1992',
      diabetesType: 'type 1',
      fullName: 'Jack Peters',
      id: '1234',
      treatment: 'treatment XYZ',
    },
  ];
  test('it renders correctly', () => {
    const wrapper = shallow(
      <PatientSearchWidget results={patients} onSearch={() => null} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
