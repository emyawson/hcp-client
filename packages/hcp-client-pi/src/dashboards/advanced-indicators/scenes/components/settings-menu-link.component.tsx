import * as React from 'react';

import { ArrowIcon, GearIcon } from '@roche/patterns-indicators/assets/icons';
import { Div } from '@roche/patterns-indicators/components';

import {
  ArrowContainer,
  SettingsMenuLinkContainer,
  TextContainer,
} from './settings-menu-link.style';

interface SettingsMenuLinkProps {
  caretDirection?: 'up' | 'down';
  color?: string;
  onClick: () => void;
}
export const SettingsMenuLinkComponent = ({
  caretDirection = 'down',
  color,
  onClick,
}: SettingsMenuLinkProps) => (
  <SettingsMenuLinkContainer onClick={onClick}>
    <GearIcon fillColor={color} height={20} />
    <TextContainer>
      <Div color={color}>CONFIGURE ALERTS & PATTERNS</Div>
    </TextContainer>
    <ArrowContainer direction={caretDirection}>
      <ArrowIcon fillColor={color} height={7} />
    </ArrowContainer>
  </SettingsMenuLinkContainer>
);

export const SettingsMenuLink = SettingsMenuLinkComponent;
