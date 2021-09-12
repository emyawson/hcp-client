import React from 'react';

import {
  Block,
  CursorBlock,
  LocalizedText,
  Button,
  Column,
} from 'src/components';
import { translate } from 'src/i18n';
import { XIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles';

import { ContentWrapper } from './support-modal.style';

import { CommonHeader, ModalBody } from '../../modal.style';

const TITLE_KEY = 'modals.support.title';

export const SupportModal = ({
  title = TITLE_KEY,
  data = {
    infoTitle: '',
    info: '',
  },
  destroyModal,
}) => (
  <ModalBody>
    <div>
      <CommonHeader>
        <LocalizedText fontSize={4} textKey={title} />
        <CursorBlock onClick={destroyModal}>
          <span>
            <XIcon height={14} fillColor={colors.white} />
          </span>
        </CursorBlock>
      </CommonHeader>
    </div>
    <div>
      <ContentWrapper>
        <Block p={3} align="center">
          <LocalizedText
            textAlign="center"
            fontSize={4}
            textKey={data.infoTitle}
          />
        </Block>
        <Block p={3} align="center">
          <LocalizedText textAlign="center" fontSize={2} textKey={data.info} />
        </Block>
        <div>
          <Column alignItems="center" p={3}>
            <Block w={4}>
              <Button
                label={translate('modals.support.accept')}
                uppercase
                w={5}
                onClick={destroyModal}
              />
            </Block>
          </Column>
        </div>
      </ContentWrapper>
    </div>
  </ModalBody>
);
