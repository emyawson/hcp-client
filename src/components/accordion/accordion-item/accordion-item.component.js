import React from 'react';

import { RenderIf } from 'src/utils/render-if';
import { Card, IndicatorLabel } from 'src/components';

import { AccordionToggle } from '../accordion-toggle';
import { AccordionItemDiv, AccordionItemContentDiv } from '../accordion.style';

type Props = {
  active: boolean,
  children: Node,
  disabled: boolean,
  id: string,
  label: string,
  labelled: boolean,
  title: Node | string,
  toggleHandler: (id: string) => void,
  labelDisplayLogic?: (id: string) => boolean,
};

export const AccordionItem = ({
  active,
  children,
  disabled,
  id,
  label,
  labelDisplayLogic = () => true,
  labelled,
  title = '',
  toggleHandler,
  cardStyles = ['blue'],
}: Props) => (
  <AccordionItemDiv active={active}>
    <RenderIf validate={label && labelled && labelDisplayLogic(id)}>
      <IndicatorLabel text={label} active={active} marginDirection="bottom" />
    </RenderIf>
    <AccordionToggle
      active={active}
      disabled={disabled}
      id={id}
      toggleHandler={toggleHandler}
      isNested={true}
    >
      {title}
    </AccordionToggle>
    <AccordionItemContentDiv
      active={active}
      aria-labelledby={`AccordionTitle--${id}`}
    >
      <Card active={active} cardStyles={cardStyles}>
        {children}
      </Card>
    </AccordionItemContentDiv>
  </AccordionItemDiv>
);
