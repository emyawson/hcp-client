import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { Patients } from './patients.component';

it('renders correctly', () => {
  const mockProps = {
    getAllPatients: () => {},
    isFetchingPatients: false,
    patients: [
      {
        id: 1,
        name: {
          first: 'Bob',
          last: 'Smith',
        },
        diabetesType: 1,
        birthdate: 19900101,
        phone: 212111111,
      },
      {
        id: 2,
        name: {
          first: 'Jane',
          last: 'Lee',
        },
        diabetesType: 2,
        birthdate: 19801212,
        phone: 2122222222,
      },
    ],
    match: {
      url: '/',
      isExact: false,
      params: {},
      path: '/',
    },
  };

  const component = shallow(<Patients {...mockProps} />);

  expect(component).toMatchSnapshot();
});

it('renders without crashing', () => {
  const mockProps = {
    getAllPatients: () => {},
    isFetchingPatients: false,
    patients: [],
    match: {
      url: '/',
      isExact: false,
      params: {},
      path: '/',
    },
  };

  const div = document.createElement('div');

  ReactDOM.render(<Patients {...mockProps} />, div);
});
