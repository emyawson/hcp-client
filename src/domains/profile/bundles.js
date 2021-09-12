import React from 'react';

import { Bundle } from 'src/navigation';

export const ProfileBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        ProfileContainer,
      } = await import(/* webpackChunkName: "profile-chunk" */ './scenes/profile');
      return ProfileContainer;
    }}
    bundleDidLoad={ProfileContainer => <ProfileContainer {...props} />}
  />
);
