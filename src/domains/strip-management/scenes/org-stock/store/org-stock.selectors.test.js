import { selectAggregateLastShipmentDate } from './org-stock.selectors';

describe('org stock selectors', () => {
  const mockedState = {
    orgStock: {
      stripModelStocks: {
        one: { lastShipmentDate: '2017-12-02T18:21:03.182Z' },
        two: { lastShipmentDate: '2017-11-02T18:21:03.182Z' },
        three: { lastShipmentDate: '2017-10-02T18:21:03.182Z' },
      },
    },
  };
  it("should select and format the most recent 'last added date'", () => {
    expect(selectAggregateLastShipmentDate(mockedState)).toEqual(
      'December 2 2017',
    );
  });
});
