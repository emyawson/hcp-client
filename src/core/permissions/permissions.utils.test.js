import { hasPermissions } from './permissions.utils';
import { PROFESSIONAL, DATA_DOWNLOAD } from './permissions.constants';

describe('Permissions utils test', () => {
  it('returns null if there are no current permissions', () => {
    expect(
      hasPermissions({
        toValidate: [PROFESSIONAL, DATA_DOWNLOAD],
        current: [],
      }),
    ).toEqual(null);
  });
});
