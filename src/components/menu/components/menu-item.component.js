import React from 'react';
import { propEq } from 'ramda';

import {
  Icon,
  MenuIconWrapper,
  StyledButton,
  StyledLink,
  SelectedLine,
  StyledHref,
  MenuIconLabel,
} from 'src/components';
import { colors } from 'src/core/styles';
import { translate } from 'src/i18n';

export const MenuItem = ({ item, onClick }) => {
  const ComponentMap = {
    BUTTON: StyledButton,
    HREF: StyledHref,
    LINK: StyledLink,
  };

  const MenuIcon = item.icon;
  const Element = ComponentMap[item.type];
  const isAppLogo = propEq('name', 'logoIcon')(item);

  return (
    <Icon key={item.name}>
      <Element
        item={item}
        activeClassName={isAppLogo ? '' : 'selected'}
        onClick={onClick}
        id={item.name}
        {...item.props}
      >
        {!isAppLogo && <SelectedLine />}
        <MenuIconWrapper>
          <MenuIcon color={colors.grayLight} height={item.iconHeight || 20} />
        </MenuIconWrapper>
        {!isAppLogo && (
          <MenuIconLabel>{translate(`menu.${item.name}`)}</MenuIconLabel>
        )}
      </Element>
    </Icon>
  );
};
