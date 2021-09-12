import React from 'react';
import { compose } from 'recompose';

import { EConectaFrame } from 'src/components';
import { translate } from 'src/i18n';
import { withToken } from 'src/utils/with-token';
import { withNavigators } from 'src/utils/with-navigators';

export const DefaultGraphicSettingsComponent = compose(
  withToken,
  withNavigators({
    hasTopNav: true,
    hasLeftNav: true,
  }),
)(({ token }) => (
  <EConectaFrame
    title={translate('patient.graphSettings')}
    token={token}
    action="graphicSettings"
  />
));
