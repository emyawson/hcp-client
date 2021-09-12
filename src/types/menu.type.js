import type { ComponentType } from 'react';

export type Link = {
  to: string,
  name: string,
  icon: ComponentType<*>,
  iconHeight: number,
};
export type UserTypes = 'HCP' | 'COMMON' | 'DEFAULT';
export type RouteType = {
  path: string,
  Component: ComponentType<*>,
  users: Array<UserTypes>,
  exact?: boolean,
};
