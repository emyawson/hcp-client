import { RouterState } from 'react-router-redux';
import { AuthenticationState } from 'src/core/authentication/authentication.types';
import { ConfigState } from 'src/core/config/config.types';
import { PermissionState } from 'src/core/permissions/permissions.types';
import { UserState } from 'src/core/user/user.types';

import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';

export interface State {
  readonly [PATTERNS_AND_INDICATORS_NAMESPACE]: {
    readonly counter: any; // MUST add a field name for properties that will be dynamically imported reducers
    readonly forms: any; // MUST add a field name for properties that will be dynamically imported reducers
    readonly piProfileSetup: any;
    readonly advancedIndicators: any;
    readonly config: ConfigState;
  };

  readonly router: RouterState;
  readonly user: UserState;
  readonly session: AuthenticationState;
  readonly permissions: PermissionState;
}
