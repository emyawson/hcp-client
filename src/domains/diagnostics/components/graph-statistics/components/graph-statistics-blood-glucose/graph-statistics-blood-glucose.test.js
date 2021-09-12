import React from 'react';
import { shallow } from 'enzyme';

import { GraphDetailBloodGlucose } from './graph-statistics-blood-glucose.component';

describe('graph-statistics-blood-glucose test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <GraphDetailBloodGlucose
        bloodGlucoseMean={100}
        bloodGlucoseStandardDeviation={85}
        testsPerDay={12}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
