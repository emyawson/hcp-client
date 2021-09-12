import { Action, PayloadAction } from './app.types';

export const createAction = <Type extends string, Meta = void>(
  type: Type,
  meta?: Meta,
): Action<Type, Meta> => ({ type, meta });

export const createPayloadAction = <Type extends string, Payload, Meta = void>(
  type: Type,
  payload: Payload,
  meta?: Meta,
): PayloadAction<Type, Payload, Meta> => ({ type, payload, meta });
