import React from 'react';

import { RenderIf } from 'src/utils/render-if';
import { MaximizeIcon } from 'src/assets/icons';

import { CardHeaderWrapper, CardTitle, IconDiv } from './card-header.style';

import { CardIcon } from '../card-icon';

const createCardHeaderIcons = ({
  expandable,
  popoverActions,
  link,
  cardStyles,
}) => (
  <IconDiv cardStyles={cardStyles}>
    <RenderIf validate={expandable}>
      <CardIcon icon={<MaximizeIcon />} link={link} />
    </RenderIf>
  </IconDiv>
);

export const CardHeader = ({
  cardStyles,
  title,
  customHeaderComponent,
  expandable,
  link,
  ...props
}) => (
  <CardHeaderWrapper cardStyles={cardStyles} {...props}>
    <RenderIf validate={customHeaderComponent}>
      {customHeaderComponent}
    </RenderIf>
    <RenderIf validate={!customHeaderComponent && title}>
      <CardTitle cardStyles={cardStyles} {...props}>
        {title}
      </CardTitle>
    </RenderIf>
    {createCardHeaderIcons({ expandable, link, cardStyles, ...props })}
  </CardHeaderWrapper>
);
