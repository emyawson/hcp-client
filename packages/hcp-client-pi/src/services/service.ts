import { ServiceFactory } from './service.types';

export const createService: ServiceFactory = (request, transform) => params =>
  request(params).then(transform);
