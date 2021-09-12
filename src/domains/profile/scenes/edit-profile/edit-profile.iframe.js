import React from 'react';

import { translate } from 'src/i18n';
import { EConectaFrame } from 'src/components';

export const EditProfile = ({ token }) => (
  <EConectaFrame
    title={translate('profile.editProfessional')}
    token={token}
    action="editProfessional"
  />
);
