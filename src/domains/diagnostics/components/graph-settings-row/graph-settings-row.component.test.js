import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import { GraphSettingsRowComponent } from './graph-settings-row.component';

import 'react-dates/initialize';

const mockProps = {
  graphType: 'details',
  changeGraphType: () => {},
  onDatesChange: () => {},
  startDate: new Date('Wed Nov 29 2017 10:10:41 GMT-0500 (EST)'),
  endDate: new Date('Tue Dec 05 2017 10:10:41 GMT-0500 (EST)'),
};

describe('Graph Settings Row Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GraphSettingsRowComponent {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GraphSettingsRowComponent {...mockProps} />, div);
  });
});
