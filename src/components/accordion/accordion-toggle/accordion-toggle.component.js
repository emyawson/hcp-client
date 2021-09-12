import * as React from 'react';

import { handleKeyPressClick } from 'src/utils';
import { ArrowButton } from 'src/components';

import {
  AccordionToggleDiv,
  AccordionToggleContentDiv,
  AccordionToggleButtonContainerDiv,
} from '../accordion.style';

export const AccordionToggle = ({
  active = false,
  children,
  disabled = false,
  id,
  isNested = false,
  toggleHandler = () => undefined,
}) => {
  const dispatchEventsIfEnabled = (e: Event) => {
    if (!disabled) {
      toggleHandler(e);
    }
  };
  return (
    <AccordionToggleDiv
      active={active}
      disabled={disabled}
      isNested={isNested}
      onClick={dispatchEventsIfEnabled}
      onKeyPress={handleKeyPressClick(dispatchEventsIfEnabled)}
      tabIndex={0}
      role="heading"
    >
      <AccordionToggleContentDiv id={`AccordionTitle--${id}`}>
        {children}
      </AccordionToggleContentDiv>
      <AccordionToggleButtonContainerDiv active={active} disabled={disabled}>
        <ArrowButton disabled={disabled} direction={'down'} />
      </AccordionToggleButtonContainerDiv>
    </AccordionToggleDiv>
  );
};
