import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';
import { AdvancedIndicatorsState } from '@roche/patterns-indicators/dashboards/advanced-indicators';
import { CounterState } from '@roche/patterns-indicators/domains/counter/store';
import { FormTemplateBuilderState } from '@roche/patterns-indicators/domains/form-template-builder/store';
import { PiProfileSetupState } from '@roche/patterns-indicators/domains/pi-profile-setup/store/pi-profile-setup.types';
import { AppConfig } from '@roche/patterns-indicators/types/app-config.types';

export type State = {
  readonly [PATTERNS_AND_INDICATORS_NAMESPACE]: {
    readonly advancedIndicators: AdvancedIndicatorsState;
    readonly config: AppConfig;
    readonly counter: CounterState;
    readonly piProfileSetup: PiProfileSetupState;
    readonly forms: FormTemplateBuilderState;
  };
};

export type Action<Type, Meta = void> = {
  readonly type: Type;
  readonly meta?: Meta;
};

export type PayloadAction<Type, Payload, Meta = void> = Action<Type, Meta> & {
  readonly payload: Payload;
};

export enum NAMESPACES {
  PATTERNS_AND_INDICATORS_NAMESPACE = 'patternsAndIndicators',
}
