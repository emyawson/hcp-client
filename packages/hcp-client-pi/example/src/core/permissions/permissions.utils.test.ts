import { PERMISSIONS } from './permissions.constants';
import { hasPermissions } from './permissions.utils';

describe('Permissions utils test', () => {
  it('returns null if there are no current permissions', () => {
    expect(
      hasPermissions({
        toValidate: [PERMISSIONS.DATA_DOWNLOAD, PERMISSIONS.GLUCOSE_STATISTICS],
        current: [],
      }),
    ).toEqual(false);
  });
});
