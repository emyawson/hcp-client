import React from 'react';

import {
  Block,
  CursorBlock,
  LocalizedText,
  P,
  Subheading,
} from 'src/components';
import { CEIcon, FactoryIcon, XIcon, FactoryWhiteIcon } from 'src/assets/icons';
import { translate } from 'src/i18n';
import { colors } from 'src/core/styles';
import { hasValue, RenderIf } from 'src/utils';

import {
  ManufacturerInfoLogoDiv,
  FlexWrapperDiv,
  AddressDiv,
  ManufacturerInfoTitle,
  ManufacturerInfoSubTitle,
  YearSpan,
  FactoryIconDiv,
  ManufacturerInfoWhiteLogoDiv,
} from './manufacturer-info-modal.style';

import { ModalBody, CommonHeader } from '../../modal.style';

const appVersion =
  process.env.REACT_APP_VERSION &&
  `${translate('manufacturerInfo.version')}${process.env.REACT_APP_VERSION}`;

export const ManufacturerInfoModal = ({ destroyModal }) => (
  <ModalBody minWidth={500}>
    <CommonHeader>
      <LocalizedText fontSize={4} textKey={'manufacturerInfo.title'} />
      <CursorBlock onClick={destroyModal}>
        <span>
          <XIcon height={14} fillColor={colors.white} />
        </span>
      </CursorBlock>
    </CommonHeader>
    <Block p={3}>
      <FlexWrapperDiv>
        <div>
          <ManufacturerInfoTitle>
            {translate('general.appName')}
          </ManufacturerInfoTitle>
          <RenderIf validate={hasValue(appVersion)}>
            <ManufacturerInfoSubTitle>
              {`${translate('general.appName')} ${appVersion}`}
            </ManufacturerInfoSubTitle>
          </RenderIf>
          <Subheading>{translate('manufacturerInfo.description')}</Subheading>
        </div>
        <ManufacturerInfoLogoDiv>
          <CEIcon fillColor={colors.black} />
        </ManufacturerInfoLogoDiv>
      </FlexWrapperDiv>
      <AddressDiv>
        <FactoryIconDiv>
          <FactoryIcon fillColor={colors.black} strokeColor={colors.black} />
        </FactoryIconDiv>
        <div>
          <P>{translate('manufacturerInfo.addressLine1')}</P>
          <P>{translate('manufacturerInfo.addressLine2')}</P>
          <P>{translate('manufacturerInfo.addressLine3')}</P>
          <P>{translate('manufacturerInfo.addressLine4')}</P>
        </div>
        <div>
          <ManufacturerInfoWhiteLogoDiv>
            <FactoryWhiteIcon
              fillColor={colors.white}
              strokeColor={colors.black}
              strokeWidth="3"
            />
            <YearSpan>2018</YearSpan>
          </ManufacturerInfoWhiteLogoDiv>
        </div>
      </AddressDiv>
    </Block>
  </ModalBody>
);
