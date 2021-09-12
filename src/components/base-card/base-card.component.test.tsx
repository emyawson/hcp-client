import * as React from 'react';

import { shallowWithTheme } from 'src/test/render-with-theme';
import { theme } from 'src/theme/index';

import { BaseCard } from './base-card.component';

describe('BaseCard test suite', () => {
  it('Should wrap all children with a styled card', () => {
    const tree = shallowWithTheme(
      <BaseCard>
        <div>Patient</div>
        <div>Info</div>
      </BaseCard>,
      theme,
    );
    expect(tree.find('div')).toHaveLength(2);
  });
});
