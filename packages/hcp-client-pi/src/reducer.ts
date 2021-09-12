import { Reducer } from 'redux';

import { Omit } from '@roche/patterns-indicators/utils/typescript/typescript.utils';

import { State } from './core';
import { AdvancedIndicatorsReducer } from './dashboards';
import { formTemplateBuilderReducer } from './domains/form-template-builder/store/form-template-builder.reducer';
import { piProfileSetupReducer } from './domains/pi-profile-setup';

type StateKeysToOmit = 'config' | 'counter';
export type StateInUse = Omit<State['patternsAndIndicators'], StateKeysToOmit>;

type Reducers = { [key in keyof StateInUse]: Reducer<StateInUse[key]> };

export const reducers: Reducers = {
  advancedIndicators: AdvancedIndicatorsReducer,
  forms: formTemplateBuilderReducer,
  piProfileSetup: piProfileSetupReducer,
};
