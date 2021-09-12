import { formatDateAsRowHeaderList } from './logbook-table.util';

describe('Logbook Table util test suite', () => {
  it('should correctly format date string into array', () => {
    expect(formatDateAsRowHeaderList('Monday, Feb 12, 2018')).toEqual([
      'Monday,',
      'Feb 12, 2018',
    ]);
  });
});
