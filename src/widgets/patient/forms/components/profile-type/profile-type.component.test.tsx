import * as enzyme from 'enzyme';
import * as React from 'react';

import { HomeIcon } from 'src/assets/icons';

import { ProfileType } from './profile-type.component';

describe('Create ProfileType component test suite', () => {
  it('Should render without crashing', () => {
    const tree = enzyme.shallow(
      <ProfileType
        icon={HomeIcon}
        id="basic"
        disabled={false}
        profileListOptions={[]}
        titleRoute=""
        descriptionRoute=""
        profileType=""
        optionsRoute=""
      />,
    );
    expect(tree).toHaveLength(1);
  });
});
