import React from 'react';
import { cond, T, prop, not, pipe } from 'ramda';

import {
  CaretButton,
  CARET_DIRECTION,
  CARET_MODE,
} from 'src/domains/diagnostics/components';
import { RenderIf, addCollapsable } from 'src/domains/diagnostics/utils';

import {
  CardCollapsableHeader,
  CardCollapsableTitle,
  CollapsableContentDiv,
  CardCollapsableHeaderWrapperDiv,
} from './card-collapsable.style';
import { HEADER_MODE } from './card-collapsable.constant';

import { CardBase } from '../card-base';
import { CardHeader } from '../card-header';

export const displayModes = mode => ({
  caret: CARET_MODE[mode],
  header: HEADER_MODE[mode],
});

// Active styling applied when card expanded and enabled, default when
// collapsed and enabled, and disabled when disabled (and collapsed)
export const headerDisplayMode = cond([
  [prop('isDisabled'), () => displayModes('DISABLED')],
  [
    pipe(
      prop('isCollapsed'),
      not,
    ),
    () => displayModes('ACTIVE'),
  ],
  [T, () => displayModes('DEFAULT')],
]);

export const CardCollapsable = addCollapsable(
  ({
    children,
    onToggleCollapsed,
    isCollapsed,
    title,
    isDisabled,
    ...cardProps
  }) => {
    const mode = headerDisplayMode({ isDisabled, isCollapsed });
    const CollapsableCardHeader = () => (
      <CardCollapsableHeaderWrapperDiv
        onClick={onToggleCollapsed}
        isDisabled={isDisabled}
      >
        <CardCollapsableHeader>
          <CardCollapsableTitle mode={mode.header} {...cardProps}>
            <RenderIf validate={title}>{title}</RenderIf>
          </CardCollapsableTitle>
        </CardCollapsableHeader>

        <CaretButton
          direction={isCollapsed ? CARET_DIRECTION.DOWN : CARET_DIRECTION.UP}
          mode={mode.caret}
        />
      </CardCollapsableHeaderWrapperDiv>
    );
    return (
      <CardBase {...cardProps}>
        <CardHeader
          customHeaderComponent={<CollapsableCardHeader />}
          cardStyles={[...cardProps.cardStyles, 'noHeaderBorder']}
        />
        <CollapsableContentDiv isCollapsed={isCollapsed}>
          {children}
        </CollapsableContentDiv>
      </CardBase>
    );
  },
);

CardCollapsable.defaultProps = {
  title: '',
  isDisabled: false,
};
