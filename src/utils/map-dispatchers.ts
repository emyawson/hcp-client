import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';

export const mapDispatchers = (dispatchers: ActionCreatorsMapObject) => (
  dispatch: Dispatch<any>,
): { [key: string]: any } => ({
  ...bindActionCreators(dispatchers, dispatch),
  dispatch,
});
