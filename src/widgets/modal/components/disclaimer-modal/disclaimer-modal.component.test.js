import React from 'react';
import { shallow } from 'enzyme';

import { LocalizedText, Block } from 'src/components';
import { RenderIf } from 'src/utils';

import { DisclaimerModal } from './disclaimer-modal.component';
import { Footer, ContentWrapper } from './disclaimer-modal.style';

import { CommonHeader, ModalBody } from '../../modal.style';

describe('Login test suites', () => {
  let wrapper = null;
  beforeAll(() => {
    wrapper = shallow(
      <DisclaimerModal
        destroyModal={() => false}
        data={{
          disclaimers: [
            {
              titleKey: 'modals.disclaimer.testFrequency.title',
              descKey: 'modals.disclaimer.testFrequency.desc',
            },
          ],
        }}
      />,
    );
  });

  it('should have these elements', () => {
    expect(wrapper.find(LocalizedText)).toHaveLength(5);
    expect(wrapper.find(Block)).toHaveLength(3);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(CommonHeader)).toHaveLength(1);
    expect(wrapper.find(ContentWrapper)).toHaveLength(1);
    expect(wrapper.find(ModalBody)).toHaveLength(1);
    expect(wrapper.find(RenderIf)).toHaveLength(2);
  });
});
