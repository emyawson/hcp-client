import { ActionsObservable } from 'redux-observable';

import { DEFAULT_CONFIG } from '@roche/patterns-indicators/constants/app-config.constants';
import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';
import { createMockStore } from '@roche/patterns-indicators/test';

import { getFetchIndicatorsConfigurationTemplateEpic } from './form-template-builder.epics';
import { formTemplateBuilderReducer } from './form-template-builder.reducer';
import { FormTemplateBuilderActionType } from './form-template-builder.types';

describe('fetchIndicatorsConfigurationTemplateEpic test suite ', () => {
  const mockIndicatorsConfigurationTemplate = {
    pattern1: {
      enabled: false,
    },
    pattern2: {
      enabled: true,
      numberField: 123,
    },
  };

  const mockIndicatorsConfigurationTemplateSuccessService = url => query =>
    Promise.resolve(mockIndicatorsConfigurationTemplate);

  it('Should successfully dispatch success action', done => {
    const expectedOutputActionType =
      FormTemplateBuilderActionType.FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_SUCCESS;

    const action$ = ActionsObservable.of({
      type:
        FormTemplateBuilderActionType.FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_START,
      payload: { profileType: 'test' },
    });

    const mockStore = createMockStore({
      state: {
        [PATTERNS_AND_INDICATORS_NAMESPACE]: {},
      },
      reducers: {
        forms: formTemplateBuilderReducer,
        config: () => DEFAULT_CONFIG,
      },
    });

    getFetchIndicatorsConfigurationTemplateEpic(
      mockIndicatorsConfigurationTemplateSuccessService,
    )(action$, mockStore).subscribe(actualOutputAction => {
      expect(actualOutputAction.type).toEqual(expectedOutputActionType);
      expect(actualOutputAction.payload).toEqual(
        mockIndicatorsConfigurationTemplate,
      );
      done();
    });
  });
});
