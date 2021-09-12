import { shallow } from 'enzyme';
import * as React from 'react';

import { SegmentedButton } from './segmented-button.component';

describe('segmented button test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <SegmentedButton
        selectedSegment={'Trend Graph'}
        labels={['Trend Graph', 'Log Book']}
        // tslint:disable-next-line:jsx-no-lambda
        onSegmentClick={clickedLabel => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
