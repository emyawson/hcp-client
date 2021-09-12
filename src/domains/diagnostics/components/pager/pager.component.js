import React from 'react';

import {
  RightChevronIcon,
  RightGuillemetIcon,
  LeftChevronIcon,
  LeftGuillemetIcon,
} from 'src/domains/diagnostics/assets/icons';
import { stopPropagation } from 'src/domains/diagnostics/utils';
import { colors } from 'src/domains/diagnostics/styles';
import { PAGER_TYPE } from 'src/domains/diagnostics/constants';

import { PagerButton, PagerWrapper } from './pager.style';

const colorDisabled = colors.grayLight;
const colorPagination = colors.darkBlueMarine;

export const Pager = ({
  children,
  onClickPager,
  isDisabledPrev,
  isDisabledSuperPrev,
  isDisabledNext,
  isDisabledSuperNext,
}) => (
  <PagerWrapper>
    <PagerButton
      onClick={() => {
        stopPropagation();
        onClickPager(PAGER_TYPE.SUPER_PREV);
      }}
      disabled={isDisabledSuperPrev}
    >
      <LeftGuillemetIcon
        strokeColor={isDisabledSuperPrev ? colorDisabled : colorPagination}
        withBorder={true}
      />
    </PagerButton>
    <PagerButton
      onClick={() => {
        stopPropagation();
        onClickPager(PAGER_TYPE.PREV);
      }}
      disabled={isDisabledPrev}
    >
      <LeftChevronIcon
        strokeColor={isDisabledPrev ? colorDisabled : colorPagination}
        withBorder={true}
      />
    </PagerButton>

    {children}
    <PagerButton
      onClick={() => {
        stopPropagation();
        onClickPager(PAGER_TYPE.NEXT);
      }}
      disabled={isDisabledNext}
    >
      <RightChevronIcon
        strokeColor={isDisabledNext ? colorDisabled : colorPagination}
        withBorder={true}
      />
    </PagerButton>
    <PagerButton
      onClick={() => {
        stopPropagation();
        onClickPager(PAGER_TYPE.SUPER_NEXT);
      }}
      disabled={isDisabledSuperNext}
    >
      <RightGuillemetIcon
        strokeColor={isDisabledSuperNext ? colorDisabled : colorPagination}
        withBorder={true}
      />
    </PagerButton>
  </PagerWrapper>
);
