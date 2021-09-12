import { buildUrl, queryParamsToQueryString } from 'src/utils/index';

test('Converts object of query parameters to a query string', () => {
  const mockQueryParams = {
    therapyId: 1,
    clinicId: 2,
    doctorId: 3,
  };
  expect(queryParamsToQueryString(mockQueryParams)).toBe(
    'therapyId=1&clinicId=2&doctorId=3',
  );
});

test('Returns empty query string if there are no params', () => {
  const mockQueryParams = {};
  expect(queryParamsToQueryString(mockQueryParams)).toBe('');
});

test('Returns query string, excluding params that have null or undefined value', () => {
  const mockQueryParams = {
    therapyId: 1,
    doctorId: null,
    clinicId: undefined,
  };
  expect(queryParamsToQueryString(mockQueryParams)).toBe('therapyId=1');
});

test('Returns query string with just the url if there are no params', () => {
  const mockQueryParams = {};
  expect(buildUrl('strip-management.com', mockQueryParams)).toBe(
    'strip-management.com',
  );
});

test('Returns query string with url and params', () => {
  const mockQueryParams = {
    therapyId: 1,
    clinicId: 2,
    doctorId: 3,
  };
  expect(buildUrl('strip-management.com', mockQueryParams)).toBe(
    'strip-management.com?therapyId=1&clinicId=2&doctorId=3',
  );
});
