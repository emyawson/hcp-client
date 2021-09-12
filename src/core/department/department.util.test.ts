import { ProfileType } from 'src/services/department/profile-types';
import { verifyType } from './department.util';
import { ProfileTypes } from './department.types';

describe('department utils suite', () => {
  const profileType: ProfileType = {
    department: {
      id: 0,
      name: '',
      sapCodeClient: '',
      sapCodePayer: '',
    },
    id: 0,
    profile: {
      code: '',
      id: 41,
      label: '',
      mandatory: true,
      name: '',
      role: 'PATIENT',
    },
  };
  it('should verify the type to be basic', () => {
    expect(verifyType(profileType)(ProfileTypes.basic)).toBeTruthy();
  });
  it('should verify the type not to be homeDelivery', () => {
    expect(verifyType(profileType)(ProfileTypes.homeDelivery)).toBeFalsy();
  });
  it('should verify the type not to be pickup', () => {
    expect(verifyType(profileType)(ProfileTypes.pickup)).toBeFalsy();
  });
});
