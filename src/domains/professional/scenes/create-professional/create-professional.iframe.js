import React from 'react';
import { compose } from 'recompose';

import { EConectaFrame } from 'src/components';
import { translate } from 'src/i18n';
import { withToken } from 'src/utils/with-token';
import { withNavigators } from 'src/utils/with-navigators';

export const CreateProfessionalComponent = compose(
  withToken,
  withNavigators({
    hasTopNav: true,
    hasLeftNav: true,
  }),
)(({ token }) => (
  <EConectaFrame
    title={translate('professional.createProfessional')}
    token={token}
    action="createProfessional"
  />
));
