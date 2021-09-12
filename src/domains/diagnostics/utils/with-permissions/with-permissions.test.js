import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import { WithPermissions } from './with-permissions.container';
import { WithPermissionsComponent } from './with-permissions.component';

const renderWithStoreAndProvider = store => components =>
  mount(<Provider store={store}>{components}</Provider>);

describe('Permissions test suite', () => {
  /**
   * Bootstrap store
   */
  let store;
  let renderWithProvider;
  const mockStore = configureMockStore();
  beforeAll(() => {
    store = mockStore({
      permissions: ['ROLE_PERMISSION_A'],
    });
    renderWithProvider = renderWithStoreAndProvider(store);
  });

  /**
   * Test
   */
  describe('Permissions component tests', () => {
    it("should call the access denied method when you don't have access", () => {
      const onAccessDeniedSpy = sinon.spy();
      shallow(
        <WithPermissionsComponent
          hasAccess={false}
          currentPermissions={[1, 2, 3]}
          onAccessDenied={onAccessDeniedSpy}
        />,
      );
      expect(onAccessDeniedSpy.called).toBe(true);
    });

    it('should call the render method when you have access', () => {
      const onRenderSpy = sinon.spy();
      shallow(
        <WithPermissionsComponent
          hasAccess={true}
          currentPermissions={[1, 2, 3]}
          onRender={onRenderSpy}
        />,
      );
      expect(onRenderSpy.called).toBe(true);
    });

    it("should call the verification method and componentDidMount when you don't have current permissions to verify against", () => {
      sinon.spy(WithPermissionsComponent.prototype, 'componentDidMount');
      const onVerificationSpy = sinon.spy();

      shallow(
        <WithPermissionsComponent
          hasAccess={true}
          currentPermissions={[]}
          onVerification={onVerificationSpy}
          dispatch={() => null}
        />,
      );
      expect(onVerificationSpy.called).toBe(true);
      expect(
        WithPermissionsComponent.prototype.componentDidMount,
      ).toHaveProperty('callCount', 1);
      WithPermissionsComponent.prototype.componentDidMount.restore();
    });
  });

  describe('Permissions container tests', () => {
    describe('Permissions accepted', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = renderWithProvider(
          <WithPermissions hasPermissions={['ROLE_PERMISSION_A']}>
            <div className="accessible">accessible data</div>
          </WithPermissions>,
        );
      });
      afterAll(() => {
        wrapper.detach();
      });
      it('should default display children when access is available', () => {
        expect(
          wrapper.find('WithPermissionsComponent').props().hasAccess,
        ).toEqual(true);
        expect(
          wrapper.find('WithPermissionsComponent').props().permissions,
        ).toEqual({ hasPermissionA: true });
      });
    });
    describe('Permissions denied', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = renderWithProvider(
          <WithPermissions hasPermissions={['ROLE_PERMISSION_B']}>
            <div>never got here</div>
          </WithPermissions>,
        );
      });
      afterAll(() => {
        wrapper.detach();
      });
      it('should default display children when access is available', () => {
        expect(
          wrapper.find('WithPermissionsComponent').props().hasAccess,
        ).toEqual(false);
        expect(
          wrapper.find('WithPermissionsComponent').props().permissions,
        ).toEqual({ hasPermissionB: false });
      });
    });
  });
});
