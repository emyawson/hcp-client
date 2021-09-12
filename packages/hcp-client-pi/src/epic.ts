import { Epic } from 'redux-observable';

import { State } from './core';
import { formTemplateBuilderEpic } from './domains/form-template-builder/store/form-template-builder.epics';
import { setPiProfileEpic } from './domains/pi-profile-setup/store/pi-profile-setup.epics';

type Epics = Array<Epic<any, State>>;

// TODO: add aggregate type for actions and pass in as generic argument
export const epics: Epics = [formTemplateBuilderEpic, setPiProfileEpic];
