import React from 'react';

import { AppLogoWordmark } from 'src/assets/icons';

import { LogoDiv, MainContent, PageBody } from './authentication.style';

export const AuthenticationPage = ({ children }) => (
  <MainContent>
    <LogoDiv>
      <AppLogoWordmark height={60} />
    </LogoDiv>
    <PageBody>{children}</PageBody>
  </MainContent>
);
