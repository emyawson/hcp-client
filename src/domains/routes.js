import { authenticationLinks } from './authentication/routes';
import { diagnosticsLinks } from './diagnostics/routes';
import { generalLinks } from './general/routes';
import { indicatorsLinks } from './indicators/routes';
import { patientLinks } from './patient/routes';
import { stripManagementLinks } from './strip-management/routes';

export const routes = {
  authentication: authenticationLinks,
  diagnostics: diagnosticsLinks,
  general: generalLinks,
  indicators: indicatorsLinks,
  patient: patientLinks,
  stripManagement: stripManagementLinks,
};
