import { createService } from './core.service';

describe('app.service tests', () => {
  it('should create a service that requests and transforms', () => {
    const testTransform = (responseBody: any) => ({ b: responseBody.a });
    const testRequest = (params: { a: string }) => Promise.resolve(params);
    const test = createService(testRequest, testTransform);

    const mockValue = 'test service';
    return test({ a: mockValue }).then(result => {
      expect(result.b).toBe(mockValue);
    });
  });
});
