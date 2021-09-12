import * as enzyme from 'enzyme';
import * as React from 'react';

import { SelectProfileListItem } from './select-profile-list-item.component';

describe('Create SelectProfileListItem component test suite', () => {
  it('Should render without crashing', () => {
    const tree = enzyme.shallow(
      <SelectProfileListItem>Hello</SelectProfileListItem>,
    );
    expect(tree).toHaveLength(1);
  });
});
