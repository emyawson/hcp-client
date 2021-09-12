import * as React from 'react';

import { ChildrenDiv } from 'src/components';
import { RenderIf } from 'src/utils';
import { SideBarContainer, TopNavigationContainer } from 'src/widgets';

export const NavigatorWrapper = ({ hasTopNav, hasLeftNav, children }) => (
  <ChildrenDiv addMargin={hasLeftNav || hasTopNav} className="print-no-m">
    <RenderIf validate={hasLeftNav}>
      <div>
        <SideBarContainer />
      </div>
    </RenderIf>
    <RenderIf validate={hasTopNav}>
      <TopNavigationContainer />
    </RenderIf>
    {children}
  </ChildrenDiv>
);

export const withNavigators = ({
  hasTopNav = false,
  hasLeftNav = false,
}) => Component => props => (
  <NavigatorWrapper hasTopNav={hasTopNav} hasLeftNav={hasLeftNav}>
    <Component {...props} />
  </NavigatorWrapper>
);
