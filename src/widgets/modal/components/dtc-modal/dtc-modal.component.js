import React from 'react';

import { Block, Button, CursorBlock, LocalizedText } from 'src/components';
import { translate } from 'src/i18n';
import { XIcon, DeviceDownloadIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles';
import { RenderIf } from 'src/utils';

import {
  ButtonContainerDiv,
  ContainerDiv,
  MessageP,
  DTCHeadline,
  DTCSubheadline,
  DTCHr,
  DTCIconPanel,
} from './dtc.style';

import { ModalBody, CommonHeader } from '../../modal.style';

export const DTCModalComponent = ({ token, destroyModal, url }) => (
  <ModalBody>
    <CommonHeader>
      <strong>
        <LocalizedText fontSize={4} textKey={'dtcModal.headerMessage'} />
      </strong>
      <CursorBlock onClick={destroyModal}>
        <span>
          <XIcon height={14} fillColor={colors.white} />
        </span>
      </CursorBlock>
    </CommonHeader>
    <ContainerDiv>
      <Block textAlign="center">
        <DTCHeadline>
          <LocalizedText textKey="dtcModal.title" />
        </DTCHeadline>
        <DTCSubheadline>
          <LocalizedText textKey="dtcModal.description" />
        </DTCSubheadline>
        <Block my={4}>
          <DTCIconPanel>
            <DeviceDownloadIcon height={100} />
          </DTCIconPanel>
        </Block>
        <Block mb={4}>
          <DTCHr />
        </Block>
        <MessageP>
          <LocalizedText textKey="dtcModal.required" />
        </MessageP>
        <ButtonContainerDiv>
          <RenderIf validate={url}>
            <a href={url} target="_blank" rel="noopener noreferrer" download>
              <Button
                label={translate('dtcModal.download')}
                minWidth="7.75rem"
              />
            </a>
          </RenderIf>
        </ButtonContainerDiv>
      </Block>
    </ContainerDiv>
  </ModalBody>
);
