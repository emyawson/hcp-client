import { buildQueryString } from './query-params';

describe('Query String Builder test suite', () => {
  const mockParams = {
    name: 'TestUser',
    id: 12345,
  };
  it('Should convert an object of parameters into a query string', () => {
    expect(buildQueryString(mockParams)).toEqual('id=12345&name=TestUser');
  });
  it('Should convert an object of parameters into a query string, mapped to new names', () => {
    const mockMapping = {
      name: 'userName',
      id: 'userID',
    };
    expect(buildQueryString(mockParams, mockMapping)).toEqual(
      'userID=12345&userName=TestUser',
    );
  });
  it('should skip params if no value is set', () => {
    const mockEmptyParams = {
      ...mockParams,
      name: '',
    };
    expect(buildQueryString(mockEmptyParams)).toEqual('id=12345');
  });
});
