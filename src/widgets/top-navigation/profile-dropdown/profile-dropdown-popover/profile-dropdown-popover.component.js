import React from 'react';

import { LocalizedText, Popover } from 'src/components';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import {
  PopoverListContainerDiv,
  PopoverList,
  PopoverListItem,
  PopoverListItemLink,
  PopoverListItemLinkTextSpan,
  PopoverListHeader,
  POPOVER_LINK_ACTIVE_CLASS,
} from 'src/components/popover';

import { PROFILE_MANAGEMENT_ACTIONS } from './profile-dropdown-popover.constants';
import { SignOutLink } from './profile-dropdown-popover.style';

const getProfileManagementActionListItems = () =>
  PROFILE_MANAGEMENT_ACTIONS.map(
    ({ localizedStringKeyName, url, permissions }, index) => (
      <WithPermissions
        hasPermissions={permissions}
        key={`profile-management-action-${permissions}-${index}`}
      >
        <PopoverListItem
          key={`profile-management-action-${localizedStringKeyName}`}
        >
          <PopoverListItemLink
            to={url}
            activeClassName={POPOVER_LINK_ACTIVE_CLASS}
          >
            <PopoverListItemLinkTextSpan>
              <LocalizedText
                textKey={`profileDropdownPopover.${localizedStringKeyName}`}
              />
            </PopoverListItemLinkTextSpan>
          </PopoverListItemLink>
        </PopoverListItem>
      </WithPermissions>
    ),
  );

export const ProfileDropdownPopover = props => (
  <Popover {...props}>
    <PopoverListContainerDiv>
      <PopoverListHeader>
        <LocalizedText textKey="profileDropdown.manageYourProfile" />
      </PopoverListHeader>
      <PopoverList>{getProfileManagementActionListItems()}</PopoverList>
    </PopoverListContainerDiv>
    <SignOutLink onClick={props.onSignOut}>
      <LocalizedText textKey="profileDropdown.signOut" />
    </SignOutLink>
  </Popover>
);
