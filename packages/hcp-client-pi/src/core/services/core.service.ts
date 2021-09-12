import { ServiceFactory } from './core.service.types';

export const createService: ServiceFactory = (request, transform) => params =>
  request(params).then(transform);
