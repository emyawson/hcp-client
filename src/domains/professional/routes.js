import React from 'react';
import { Switch } from 'react-router-dom';

import { ProtectedRoute } from 'src/components/protected-route';
import { PERMISSIONS } from 'src/core';

import { CreateProfessionalComponent } from './scenes/create-professional';
import { DefaultGraphicSettingsComponent } from './scenes/default-graphic-settings';

export const professionalLinks = {
  createProfessional: '/professional/create',
  defaultGraphicSettings: '/professional/default-graphic-settings',
};

export const ProfessionalRoutes = () => (
  <Switch>
    <ProtectedRoute
      exact
      path={professionalLinks.createProfessional}
      component={CreateProfessionalComponent}
      hasPermissions={[PERMISSIONS.CREATE_PROFESSIONAL]}
    />
    <ProtectedRoute
      exact
      path={professionalLinks.defaultGraphicSettings}
      component={DefaultGraphicSettingsComponent}
      hasPermissions={[PERMISSIONS.USER_SHOW_GRAPHIC_CONFIG]}
    />
  </Switch>
);
