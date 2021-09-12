import React from 'react';
import { compose } from 'recompose';
import { withPatientSummary } from 'src/domains/patient/utils/with-patient-summary';

import { EConectaFrame } from 'src/components';
import { translate } from 'src/i18n';
import { withToken } from 'src/utils/with-token';
import { withNavigators } from 'src/utils/with-navigators';

export const NextShipmentIframe = compose(
  withToken,
  withNavigators({
    hasTopNav: true,
    hasLeftNav: true,
  }),
  withPatientSummary,
)(({ match, token }) => (
  <EConectaFrame
    title={translate('patient.deliveryConfiguration')}
    token={token}
    patientId={match.params.id}
    action="nextShipment"
  />
));
