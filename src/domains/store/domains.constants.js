import { addDomainNamespace } from 'src/utils/domain-namespace';

const DOMAIN_NAMESPACE = 'DOMAINS';
const addNamespacing = actionName =>
  addDomainNamespace(actionName, DOMAIN_NAMESPACE);

export const BOOTSTRAP_DOMAINS = addNamespacing('BOOTSTRAP');
