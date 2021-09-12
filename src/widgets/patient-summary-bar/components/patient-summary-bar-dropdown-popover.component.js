import React from 'react';

import { LocalizedText, Popover } from 'src/components';
import {
  PopoverListContainerDiv,
  PopoverList,
  PopoverListHeader,
} from 'src/components/popover';

export const PatientSummaryBarDropdownPopover = props => {
  const { dropdownContent, headerText, pushLeft, show, width } = props;
  return (
    <Popover width={width} pushLeft={pushLeft} show={show}>
      <PopoverListContainerDiv>
        <PopoverListHeader>
          <LocalizedText textKey={headerText} />
        </PopoverListHeader>
        <PopoverList>{dropdownContent}</PopoverList>
      </PopoverListContainerDiv>
    </Popover>
  );
};
