import { addMockEndpointDomain, mockAuthentication } from './mock-endpoints';

describe('test suite for mock endpoints', () => {
  it('should have the following functions defined', () => {
    expect(addMockEndpointDomain('https://someurl.com')).toBeDefined();
    expect(mockAuthentication({ status: null, body: null })).toBeDefined();
  });
});
