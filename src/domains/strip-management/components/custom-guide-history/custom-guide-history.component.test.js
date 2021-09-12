import React from 'react';
import { shallow } from 'enzyme';

import { mountWithTheme } from 'src/test/render-with-theme';
import { theme } from 'src/theme';

import { CustomGuideHistory } from './custom-guide-history.component';
import { GuideHistoryPageNavigationWrapperDiv } from './custom-guide-history.style';

describe('Custom guide history component', () => {
  const baseProps = {
    customClinicGuides: [],
    guideHistoryFilter: 'ALL',
    setGuideHistoryFilter: () => {},
    onClickRemoveCustomGuide: () => {},
    currentGuidePage: 1,
    setGuideHistoryPage: () => {},
  };
  it('Renders correctly', () => {
    const mockProps = {
      ...baseProps,
      guidePageNumbers: [1, 2, 3],
    };
    const wrapper = shallow(<CustomGuideHistory {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Hides page navigation when there are less than 2 pages', () => {
    const mockProps = {
      ...baseProps,
      guidePageNumbers: [1],
    };
    const wrapper = mountWithTheme(
      <CustomGuideHistory {...mockProps} />,
      theme,
    );
    expect(wrapper.find(GuideHistoryPageNavigationWrapperDiv)).toHaveLength(0);
  });
  it('Show page navigation when there are 2 pages or more', () => {
    const mockProps = {
      ...baseProps,
      guidePageNumbers: [1, 2],
    };
    const wrapper = mountWithTheme(
      <CustomGuideHistory {...mockProps} />,
      theme,
    );
    expect(wrapper.find(GuideHistoryPageNavigationWrapperDiv)).toHaveLength(1);
  });
});
