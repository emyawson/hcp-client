import React from 'react';
import type { Element } from 'react';

import { toFormat, convertJSDateGMT } from 'src/utils/date';
import { RenderIf } from 'src/utils/render-if';

import {
  ContainerDiv,
  TopBar,
  DateWrapper,
  IconWrapper,
  DateLabel,
  BGWrapper,
  BGLabel,
  BGValueWrapper,
  BGValue,
} from './detail-hint-container.style';

type Props = {
  icon: Element<*> | null,
  topBarColor: string | null,
  date: Date | string,
  glucoseValue: number,
  unit: string,
};

export const DetailHintContainer = ({
  icon,
  topBarColor,
  date,
  glucoseValue,
  unit,
}: Props) => (
  <ContainerDiv>
    <TopBar color={topBarColor} />
    <DateWrapper>
      <RenderIf validate={icon}>
        <IconWrapper>{icon}</IconWrapper>
      </RenderIf>
      <RenderIf validate={date}>
        <div>{toFormat('HH:mm')(convertJSDateGMT(date))}</div>
        <DateLabel>{toFormat('dd/LL/yyyy')(convertJSDateGMT(date))}</DateLabel>
      </RenderIf>
    </DateWrapper>
    <BGWrapper>
      <BGLabel>BLOOD GLUCOSE</BGLabel>
      <BGValueWrapper>
        <BGValue>{glucoseValue}</BGValue> {unit}
      </BGValueWrapper>
    </BGWrapper>
  </ContainerDiv>
);
