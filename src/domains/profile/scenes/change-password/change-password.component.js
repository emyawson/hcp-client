import React from 'react';
import { screenSets } from 'src/core/gigya';

import { Column } from 'src/components';
import { GigyaScreenSet } from 'src/components/gigya-screenset';

export const ChangePassword = () => (
  <Column justifyContent="center" flex={4}>
    <GigyaScreenSet
      screenSetID={screenSets.changePassword.id}
      startScreen={screenSets.changePassword.startScreen}
    />
  </Column>
);
