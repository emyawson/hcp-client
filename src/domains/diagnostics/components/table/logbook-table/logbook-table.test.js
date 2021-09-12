import { shallow } from 'enzyme';
import React from 'react';

import { LogbookTable } from '.';

const mockLogbookData = [
  {
    day: 'Fri, 17 Oct 2017',
    mealTimes: {
      NIGHT: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
        { date: '', bloodGlucose: 39, bolus: null, carbohydrates: null },
        { date: '', bloodGlucose: 40, bolus: null, carbohydrates: null },
      ],
      BEFORE_BREAKFAST: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      AFTER_BREAKFAST: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      BEFORE_LUNCH: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      AFTER_LUNCH: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      BEFORE_DINNER: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      AFTER_DINNER: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      BEDTIME: [{ date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 }],
    },
  },
  {
    day: 'Sat, 18 Oct 2017',
    mealTimes: {
      NIGHT: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
        { date: '', bloodGlucose: 39, bolus: null, carbohydrates: null },
        { date: '', bloodGlucose: 40, bolus: null, carbohydrates: null },
      ],
      BEFORE_BREAKFAST: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      AFTER_BREAKFAST: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      BEFORE_LUNCH: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      AFTER_LUNCH: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      BEFORE_DINNER: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      AFTER_DINNER: [
        { date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 },
      ],
      BEDTIME: [{ date: '', bloodGlucose: 40, bolus: 35, carbohydrates: 15 }],
    },
  },
];

describe('LogbookTable test suite', () => {
  test('LogbookTable renders correctly', () => {
    const wrapper = shallow(<LogbookTable logbookData={mockLogbookData} />);
    expect(wrapper).toMatchSnapshot();
  });
});
