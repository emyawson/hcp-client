import * as React from 'react';

import { RenderIf } from 'src/utils/render-if';

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
}: any) => (
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
