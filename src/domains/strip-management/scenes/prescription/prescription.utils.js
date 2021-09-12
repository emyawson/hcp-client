import { propEq, head, last, prop, pipe, propOr, has } from 'ramda';

import { hasMatchingListItem } from 'src/utils';

export const isCustomClinicGuide = clinicGuideId =>
  hasMatchingListItem(propEq('id', clinicGuideId));

export const selectQuantityMaxById = (quantities, id) =>
  has(id, quantities)
    ? pipe(
        prop(id),
        last,
        propOr(0, 'value'),
      )(quantities)
    : 0;
export const selectQuantityMinById = (quantities, id) =>
  has(id, quantities)
    ? pipe(
        prop(id),
        head,
        propOr(0, 'value'),
      )(quantities)
    : 0;
