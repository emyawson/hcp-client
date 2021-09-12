import React from 'react';

import { Block, CursorBlock, LocalizedText } from 'src/components';
import { colors } from 'src/core/styles/colors';
import { DisclaimerIcon } from 'src/assets/icons';
import { convertJSDateGMT, toFormatWithLocale } from 'src/utils/date';
import { RenderIf } from 'src/utils';
import { XIcon } from 'src/assets/icons';

import { Footer, ContentWrapper } from './disclaimer-modal.style';

import { CommonHeader, ModalBody } from '../../modal.style';

const iconProps = {
  height: 64,
  width: 64,
  iconColor: colors.grayDark,
  borderColor: colors.grayDark,
  withBorder: true,
};

const renderDisclaimerRow = disclaimers =>
  disclaimers.map(
    ({ titleKey, descKey, bullets = [], footerDecKey }, index) => (
      <Block
        key={`disclaimer row ${index}`}
        p={4}
        pl="0"
        display="flex"
        flexDirection="column"
      >
        <LocalizedText
          fontSize={3}
          pb={3}
          color={colors.brandBlue}
          textKey={titleKey}
        />
        <LocalizedText fontSize={2} textKey={descKey} />
        <RenderIf validate={bullets.length > 0}>
          <ul>
            {bullets.map((bullet, index) => (
              <li key={`disclaimer bullet ${index}`}>
                <LocalizedText fontSize={2} textKey={bullet.headerKey} />
              </li>
            ))}
          </ul>
        </RenderIf>
        <RenderIf validate={footerDecKey}>
          <LocalizedText fontSize={2} pt={3} textKey={footerDecKey} />
        </RenderIf>
      </Block>
    ),
  );

export const DisclaimerModal = ({ destroyModal, data }) => (
  <ModalBody>
    <CommonHeader>
      <LocalizedText fontSize={4} textKey={'modals.disclaimer.title'} />
      <CursorBlock onClick={destroyModal}>
        <span>
          <XIcon height={14} fillColor={colors.white} />
        </span>
      </CursorBlock>
    </CommonHeader>
    <Block display="flex">
      <Block p={4}>
        <DisclaimerIcon {...iconProps} />
      </Block>
      <ContentWrapper>{renderDisclaimerRow(data.disclaimers)}</ContentWrapper>
    </Block>
    <Footer>
      <LocalizedText
        fontSize={2}
        textKey={'modals.disclaimer.lastCollectedDate'}
        values={{
          date: toFormatWithLocale('dd LLLL yyyy')(
            convertJSDateGMT(data.lastUpdateDate),
          ),
        }}
      />
    </Footer>
  </ModalBody>
);
