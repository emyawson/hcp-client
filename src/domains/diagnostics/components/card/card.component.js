import React from 'react';

import { RenderIf } from 'src/domains/diagnostics/utils/render-if';

import { CardBase, CardContent } from './card-base';
import { CardHeader } from './card-header';

export const Card = ({
  cardStyles = ['default'],
  customHeaderComponent,
  title,
  expandable = false,
  children,
  link,
  ...props
}) => (
  <CardBase cardStyles={cardStyles} {...props}>
    <RenderIf validate={title || customHeaderComponent}>
      <CardHeader
        cardStyles={cardStyles}
        title={title}
        expandable={expandable}
        customHeaderComponent={customHeaderComponent}
        link={link}
        {...props}
      />
    </RenderIf>
    <CardContent cardStyles={cardStyles}>{children}</CardContent>
  </CardBase>
);
