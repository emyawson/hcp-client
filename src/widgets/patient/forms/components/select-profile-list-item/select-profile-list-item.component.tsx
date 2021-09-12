import * as React from 'react';
import { CheckmarkIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';

import {
  IconContainer,
  OptionContainer,
} from './select-profile-list-item.style';

type SelectProfileListItemProps = {
  children: any;
};

export const SelectProfileListItem: React.StatelessComponent<
  SelectProfileListItemProps
> = ({ children }) => (
  <OptionContainer>
    <IconContainer>
      <CheckmarkIcon fillColor={colors.brandBlue} height={12} />
    </IconContainer>
    {children}
  </OptionContainer>
);
