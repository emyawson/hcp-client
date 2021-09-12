import { BOOTSTRAP_DOMAINS } from './domains.constants';

export const bootstrapDomains = () => ({
  type: BOOTSTRAP_DOMAINS,
  payload: true,
});
