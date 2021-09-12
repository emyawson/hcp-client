import { createService } from './service';

describe('app.service tests', () => {
  it('should create a service that requests and transforms', () => {
    const testTransform = (val: any) => ({ b: val.a });
    const testRequest = (params: { a: string }) =>
      Promise.resolve({ a: params.a });
    const test = createService(testRequest, testTransform);

    const mockValue = 'test service';
    return test({ a: mockValue }).then(result => {
      expect(result.b).toBe(mockValue);
    });
  });
});
