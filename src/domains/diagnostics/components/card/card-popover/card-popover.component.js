import React from 'react';

import { LocalizedText, Popover } from 'src/domains/diagnostics/components';

import {
  PopoverContainerDiv,
  PopoverHeaderDiv,
  PopoverListUl,
  PopoverListItemLi,
  PopoverItemLinkA,
  PopoverItemLinkTextSpan,
} from './card-popover.style';

type Props = {
  show: boolean,
  popoverTitleKey?: string,
  popoverActions?: {
    textKey: string,
    url: string,
  },
  innerRef?: () => void,
};

const getPopoverActionsList = actions => (
  <PopoverListUl>
    {actions.map(({ textKey, url }) => (
      <PopoverListItemLi key={`popover-action-${textKey}`}>
        <PopoverItemLinkA to={url}>
          <PopoverItemLinkTextSpan>
            <LocalizedText textKey={textKey} />
          </PopoverItemLinkTextSpan>
        </PopoverItemLinkA>
      </PopoverListItemLi>
    ))}
  </PopoverListUl>
);

export const CardPopover = ({
  show,
  popoverTitleKey,
  popoverActions,
  innerRef,
}: Props) => (
  <PopoverContainerDiv innerRef={innerRef}>
    <Popover pushLeft={0} show={show} width={17}>
      <PopoverHeaderDiv>
        <LocalizedText textKey={'userDropdown.managePatientProfile'} />
      </PopoverHeaderDiv>
      {getPopoverActionsList(popoverActions)}
    </Popover>
  </PopoverContainerDiv>
);

CardPopover.defaultProps = {
  popoverTitleKey: '',
  popoverActions: [],
  innerRef: () => null,
};
