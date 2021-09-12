import { createStructuredSelector } from 'reselect';

import { getMenuLinks } from 'src/navigation/navigation.selectors';

export const sidebarSelector = createStructuredSelector({
  menuLinks: getMenuLinks,
});
