import React from 'react';
import { compose } from 'recompose';
import { withPatientSummary } from 'src/domains/patient/utils/with-patient-summary';

import { EConectaFrame } from 'src/components';
import { translate } from 'src/i18n';
import { withToken } from 'src/utils/with-token';
import { withNavigators } from 'src/utils/with-navigators';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';

export const GraphSettingsIFrame = compose(
  withToken,
  withNavigators({
    hasTopNav: true,
    hasLeftNav: true,
  }),
  withPatientSummary,
)(({ match, token }) => (
  <WithPermissions hasPermissions={[PERMISSIONS.USER_SHOW_GRAPHIC_CONFIG]}>
    <EConectaFrame
      title={translate('patient.graphSettings')}
      token={token}
      patientId={match.params.id}
      action="graphicSettings"
    />
  </WithPermissions>
));
