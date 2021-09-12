import { TRAFFIC_LIGHT_STATES } from 'src/core';

import { checkStripsCanBeDelivered } from './strip-status-card.utils';

describe('Strip status card utils', () => {
  describe('check strips can be delivered util', () => {
    it('Returns true when status is deliver and there is non-zero number of strips', () => {
      expect(
        checkStripsCanBeDelivered(100, TRAFFIC_LIGHT_STATES.DELIVER),
      ).toEqual(true);
    });
    it('Returns true when status is deliver with alert and there is non-zero number of strips', () => {
      expect(
        checkStripsCanBeDelivered(100, TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT),
      ).toEqual(true);
    });
    it('Returns false when number of strips is zero', () => {
      expect(
        checkStripsCanBeDelivered(0, TRAFFIC_LIGHT_STATES.DELIVER),
      ).toEqual(false);
    });
    it('Returns false when status is do not deliver', () => {
      expect(
        checkStripsCanBeDelivered(0, TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER),
      ).toEqual(false);
    });
  });
});
