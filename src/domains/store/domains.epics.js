import { BOOTSTRAP_DOMAINS } from './domains.constants';

export const bootstrapDomainsEpic = () => action$ =>
  action$.ofType(BOOTSTRAP_DOMAINS);
