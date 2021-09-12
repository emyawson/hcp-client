import React from 'react';
import { shallow, mount } from 'enzyme';
import { Redirect, MemoryRouter, Route } from 'react-router-dom';

import { PERMISSIONS } from 'src/domains/diagnostics/core/permissions/permissions.constants';
import { WithPermissions } from 'src/domains/diagnostics/utils/with-permissions';

import { ProtectedRoute } from './protected-route.component';

describe('Protected route component', () => {
  const SampleComponent = () => <div>component</div>;
  const loginPath = '/login';
  const homePath = '/home';
  const baseProps = {
    path: '/patients/:id',
    exact: true,
    isAuthenticated: true,
    component: SampleComponent,
    validateSession: () => {},
    routes: {
      general: {
        home: homePath,
      },
      authentication: {
        login: loginPath,
      },
    },
    location: {
      pathname: '/login',
    },
  };
  const renderProtectedRoute = props =>
    mount(
      <MemoryRouter>
        <ProtectedRoute {...props} />
      </MemoryRouter>,
    )
      .find(Route)
      .prop('render');

  it('renders correctly', () => {
    const mockProps = {
      ...baseProps,
      hasPermissions: [PERMISSIONS.PATIENT_DIAGNOSTICS],
    };
    const wrapper = shallow(<ProtectedRoute {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with default props', () => {
    const wrapper = shallow(<ProtectedRoute {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Redirects to login if not authenticated', () => {
    const mockProps = {
      ...baseProps,
      isAuthenticated: false,
      location: { pathname: '/home' },
    };

    const RenderedProtectedRouteComponent = renderProtectedRoute(mockProps);
    const wrapper = shallow(<RenderedProtectedRouteComponent />);
    expect(wrapper.find(Redirect)).toHaveLength(1);
    expect(wrapper.find(Redirect).prop('to')).toEqual({
      pathname: '/login',
      search: '?next=/home',
    });
    expect(wrapper.find(SampleComponent)).toHaveLength(0);
  });

  it('Renders component if authenticated and no listed permission requirements', () => {
    const mockProps = {
      ...baseProps,
      isAuthenticated: true,
      hasPermissions: [],
    };
    const RenderedProtectedRouteComponent = renderProtectedRoute(mockProps);
    const wrapper = shallow(<RenderedProtectedRouteComponent />);
    expect(wrapper.find(SampleComponent).children).toHaveLength(1);
  });

  it('Checks for permissions and redirects home if access denied', () => {
    const mockProps = {
      ...baseProps,
      isAuthenticated: true,
      hasPermissions: [PERMISSIONS.PATIENT_DIAGNOSTICS],
    };
    const RenderedProtectedRouteComponent = renderProtectedRoute(mockProps);
    const wrapper = shallow(<RenderedProtectedRouteComponent />);
    expect(wrapper.find(WithPermissions)).toHaveLength(1);
    const OnAccessDeniedComponent = wrapper
      .find(WithPermissions)
      .prop('onAccessDenied');
    const onAccessDeniedWrapper = shallow(<OnAccessDeniedComponent />);
    expect(onAccessDeniedWrapper.find(Redirect)).toHaveLength(1);
    expect(onAccessDeniedWrapper.find(Redirect).prop('to')).toEqual(homePath);
  });
});
