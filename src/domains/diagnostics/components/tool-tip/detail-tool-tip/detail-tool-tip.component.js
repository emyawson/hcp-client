import React from 'react';
import { Element } from 'react';

import { RenderIf } from 'src/domains/diagnostics/utils';
import { translate } from 'src/i18n'; // TODO: move to diagnostics
import { TIME_FORMAT_24_HOURS } from 'src/domains/diagnostics/constants/diagnostics.constants';

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
} from './detail-tool-tip.style';

type Props = {
  icon: Element<*> | null,
  topBarColor: string | null,
  date: Date | string,
  glucoseValue: number,
  unit: string,
};

export const DetailToolTip = ({
  icon,
  topBarColor,
  date,
  glucoseValue,
  unit = translate('general.units.mgPerDL'),
}: Props) => {
  const formattedTime = date ? date.toFormat(TIME_FORMAT_24_HOURS) : null;
  const formattedDate = date ? date.toFormat('LLL dd/yy') : null;
  return (
    <ContainerDiv>
      <TopBar color={topBarColor} />
      <DateWrapper>
        <RenderIf validate={icon}>
          <IconWrapper>{icon}</IconWrapper>
        </RenderIf>
        <RenderIf validate={date}>
          <div>{formattedTime}</div>
          <DateLabel>{formattedDate}</DateLabel>
        </RenderIf>
      </DateWrapper>
      <BGWrapper>
        <BGLabel>
          {translate('graphs.detailGraph.toolTip.bloodGlucose')}
        </BGLabel>
        <BGValueWrapper>
          <BGValue>{glucoseValue}</BGValue> {unit}
        </BGValueWrapper>
      </BGWrapper>
    </ContainerDiv>
  );
};
