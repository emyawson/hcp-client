import React from 'react';

import { DisclaimerIcon } from 'src/domains/diagnostics/assets/icons';
import { colors } from 'src/domains/diagnostics/styles/colors';

import { NoDataDisclaimerDiv, NoDataP } from './no-data-disclaimer.style';
import { SIZE } from './no-data-disclaimer.constant';

export const NoDataDisclaimer = ({ message, size = SIZE.MEDIUM }) => {
  const theme = {
    [SIZE.SMALL]: {
      icon: {
        width: 46,
        height: 46,
      },
      fontSize: 2,
    },
    [SIZE.MEDIUM]: {
      icon: {
        width: 76,
        height: 76,
      },
      fontSize: 4,
    },
  };
  return (
    <NoDataDisclaimerDiv>
      <DisclaimerIcon
        width={theme[size].icon.width}
        height={theme[size].icon.height}
        withBorder
        iconColor={colors.charcoal}
        borderFillColor={colors.white}
        borderColor={colors.charcoal}
      />
      <NoDataP fontSize={theme[size].fontSize}>{message}</NoDataP>
    </NoDataDisclaimerDiv>
  );
};
