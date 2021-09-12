import React from 'react';
import { Route } from 'react-router-dom';

export const RouterOutlet = ({ path, children, ...props }) => (
  <Route {...props} path={path} component={() => children} />
);
