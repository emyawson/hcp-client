import { groupBy, head, map, pipe } from 'ramda';

const groupByModelId = groupBy(({ id }) => id);

const flattenStripModel = ({
  stripModel: { id, name },
  currentStock,
  lastShipmentAt,
  numberOfStripsReceived,
}) => ({
  id,
  name,
  currentStripStock: currentStock,
  lastShipmentDate: lastShipmentAt,
  lastShipmentNumberOfStripsReceived: numberOfStripsReceived,
});

export const serverToClientStripModelStocks = pipe(
  map(flattenStripModel),
  groupByModelId,
  map(head),
);
