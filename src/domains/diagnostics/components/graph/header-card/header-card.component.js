import React, { Fragment } from 'react';

import {
  HeaderBaseCard,
  Header,
  HeaderBackgroundImage,
  Subheader,
} from './header-card.style';

export const HeaderCard = ({ title, subtitle, noPaddingTop, noMarginTop }) => (
  <Fragment>
    <HeaderBaseCard noPaddingTop={noPaddingTop}>
      <Header noMarginTop={noMarginTop}>{title}</Header>
      <Subheader>{subtitle}</Subheader>
    </HeaderBaseCard>
    <HeaderBackgroundImage />
  </Fragment>
);
