import { Action, PayloadAction } from 'src/app/store/app.types';

export const actionTypeFilter = (actionType: string) => ({
  type,
}: Action<string> | PayloadAction<string, any>) => actionType === type;
