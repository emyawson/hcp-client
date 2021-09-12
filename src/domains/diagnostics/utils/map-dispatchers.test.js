// TODO: namespace diagnostics store and move this to src/domains/diagnostics/utils
import { createLegacyMockStore } from 'src/test';

import { mapDispatchers } from './map-dispatchers';

const store = createLegacyMockStore({});

const mockDispatchers = {
  fetchMockData: () => ({
    type: 'FETCH_MOCK_DATA',
    payload: {
      isData: true,
    },
  }),
  fetchMockUser: () => ({
    type: 'FETCH_MOCK_USER',
    payload: {
      id: 'user-123',
    },
  }),
};

const dispatch = actionName => store.dispatch(actionName);

describe('Map Dispatchers Test', () => {
  it('should bind action creators to component as props', () => {
    expect(mapDispatchers(mockDispatchers)(dispatch)).toEqual({
      dispatch,
      fetchMockData: expect.any(Function),
      fetchMockUser: expect.any(Function),
    });
    expect(mapDispatchers(mockDispatchers)(dispatch).fetchMockData()).toEqual(
      mockDispatchers.fetchMockData(),
    );
    expect(mapDispatchers(mockDispatchers)(dispatch).fetchMockUser()).toEqual(
      mockDispatchers.fetchMockUser(),
    );
  });
});
