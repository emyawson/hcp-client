import { shallow } from 'enzyme';
import React from 'react';

import { InsulinPump } from './';

const daysData = [
  {
    date: 'Sunday, Oct 15, 2017',
    boluses: [
      {
        time: '22:36',
        bolusValue: 3.0,
        types: ['standard', 'ADVICE'],
        comment: {
          text: '',
        },
      },
      {
        time: '22:52',
        bolusValue: 3.5,
        types: ['extended'],
        comment: {
          types: [],
          text: '',
        },
      },
    ],
    daysTotal: {
      bolusTotal: 25.5,
      comment: {
        text: '30.1 U',
        types: ['iconx', 'icony'],
      },
    },
  },
  {
    date: 'Monday, Oct 16, 2017',
    boluses: [
      {
        time: '22:36',
        bolusValue: 3.0,
        types: ['standard', 'ADVICE'],
        comment: {
          text: '',
        },
      },
      {
        time: '22:52',
        bolusValue: 3.5,
        types: ['quick'],
        comment: {
          types: [],
          text: '',
        },
      },
    ],
    daysTotal: {
      bolusTotal: 25.5,
      comment: {
        text: '30.1 U',
        types: [],
      },
    },
  },
  {
    date: 'Tuesday, Oct 17, 2017',
    boluses: [
      {
        time: '22:36',
        bolusValue: 3.0,
        types: ['standard', 'ADVICE'],
        comment: {
          text: '',
        },
      },
      {
        time: '22:52',
        bolusValue: 3.5,
        types: ['quick'],
        comment: {
          types: [],
          text: '',
        },
      },
    ],
    daysTotal: {
      bolusTotal: 25.5,
      comment: {
        text: '30.1 U',
        types: [],
      },
    },
  },
  {
    date: 'Wednesday, Oct 18, 2017',
    boluses: [
      {
        time: '22:36',
        bolusValue: 3.0,
        types: ['standard', 'ADVICE'],
        comment: {
          text: '',
        },
      },
      {
        time: '22:52',
        bolusValue: 3.5,
        types: ['quick'],
        comment: {
          types: [],
          text: '',
        },
      },
    ],
    daysTotal: {
      bolusTotal: 25.5,
      comment: {
        text: '30.1 U',
        types: [],
      },
    },
  },
];

describe('Insulin Pump - Bolus List Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<InsulinPump showDetails daysData={daysData} />);
    expect(wrapper).toMatchSnapshot();
  });
});
