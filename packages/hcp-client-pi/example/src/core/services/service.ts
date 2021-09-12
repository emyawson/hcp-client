import { Service } from './service.types';

export const createService: Service = (request, transform) => params =>
  request(params).then(transform);
