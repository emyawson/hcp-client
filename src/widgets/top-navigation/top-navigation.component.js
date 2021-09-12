import React from 'react';

import { ProfileDropdown } from './profile-dropdown';
import { TopNavigationContainerDiv } from './top-navigation.style';

export const TopNavigation = ({ fullName, onSignOut }) => (
  <TopNavigationContainerDiv className="print-hide">
    <ProfileDropdown fullName={fullName} onSignOut={onSignOut} />
  </TopNavigationContainerDiv>
);
