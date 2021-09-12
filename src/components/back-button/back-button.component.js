import React from 'react';

import { colors } from 'src/core/styles/colors';
import { Link } from 'src/components';
import { ArrowIcon } from 'src/assets/icons';

import { ArrowLeftSpan, BackButtonContainerDiv } from './back-button.style';

export const BackButton = ({ to }) => (
  <BackButtonContainerDiv>
    <Link to={to}>
      <ArrowLeftSpan>
        <ArrowIcon height={10} fillColor={colors.charcoal} />
      </ArrowLeftSpan>
    </Link>
  </BackButtonContainerDiv>
);
