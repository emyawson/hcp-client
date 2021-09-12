import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import { withPermissions } from 'src/components/with-permissions/with-permissions';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';
import { permissionsReducer } from 'src/core/permissions/permissions.reducers';
import { createMockStore, MockProvider } from 'src/test/index';

import { WithPermissionsComponent } from './with-permissions.component';
import { WithPermissions } from './with-permissions.container';

describe('Permissions test suite', () => {
  /**
   * Bootstrap store
   */
  let store;
  beforeAll(() => {
    store = createMockStore({
      state: {
        permissions: [PERMISSIONS.DATA_DOWNLOAD],
      },
      reducers: { permissions: permissionsReducer },
    });
  });

  /**
   * Test
   */
  describe('Permissions component tests', () => {
    it('should call the access denied method when you do not have access', () => {
      const onAccessDeniedSpy = sinon.spy();
      shallow(
        <WithPermissionsComponent
          hasAccess={false}
          currentPermissions={[PERMISSIONS.GLUCOSE_STATISTICS]}
          onAccessDenied={onAccessDeniedSpy}
          onRender={() => null}
          onVerification={() => null}
        />,
      );
      expect(onAccessDeniedSpy.called).toBe(true);
    });

    it('should call the render method when you have access', () => {
      const onRenderSpy = sinon.spy();
      shallow(
        <WithPermissionsComponent
          hasAccess={true}
          currentPermissions={[PERMISSIONS.GLUCOSE_STATISTICS]}
          onRender={onRenderSpy}
          onVerification={() => null}
          onAccessDenied={() => null}
        />,
      );
      expect(onRenderSpy.called).toBe(true);
    });

    it('should call the verification method and componentDidMount when you do not have current permissions to verify against', () => {
      sinon.spy(WithPermissionsComponent.prototype, 'componentDidMount');
      const onVerificationSpy = sinon.spy();

      shallow(
        <WithPermissionsComponent
          hasAccess={true}
          currentPermissions={[]}
          onVerification={onVerificationSpy}
          onRender={() => null}
          onAccessDenied={() => null}
        />,
      );
      expect(onVerificationSpy.called).toBe(true);
      expect(
        WithPermissionsComponent.prototype.componentDidMount,
      ).toHaveProperty('callCount', 1);
      // @ts-ignore
      WithPermissionsComponent.prototype.componentDidMount.restore();
    });
  });
  describe('Permissions hoc tests', () => {
    describe('Permissions accepted', () => {
      it('should default display children when access is available', () => {
        const DivComp = () => (
          <div className={'accessible'}>accessible data</div>
        );
        const Comp = withPermissions({
          permissions: [PERMISSIONS.DATA_DOWNLOAD],
        })(DivComp);
        const wrapper = mount(
          <MockProvider store={store}>
            <Comp />
          </MockProvider>,
        );
        expect(
          // @ts-ignore
          wrapper.find('WithPermissionsComponent').props().hasAccess,
        ).toEqual(true);
        expect(
          // @ts-ignore
          wrapper.find('WithPermissionsComponent').props().permissions,
        ).toEqual({ hasDataDownload: true });
      });
    });
    describe('Permissions denied', () => {
      it('should default display children when access is available', () => {
        const DivComp = () => (
          <div className={'accessible'}>accessible data</div>
        );
        const Comp = withPermissions({
          permissions: [PERMISSIONS.GLUCOSE_STATISTICS],
        })(DivComp);
        const wrapper = mount(
          <MockProvider store={store}>
            <Comp />
          </MockProvider>,
        );
        expect(
          // @ts-ignore
          wrapper.find('WithPermissionsComponent').props().hasAccess,
        ).toEqual(false);
        expect(
          // @ts-ignore
          wrapper.find('WithPermissionsComponent').props().permissions,
        ).toEqual({ hasExportGlucoseStatistics: false });
      });
    });
  });
  describe('Permissions container tests', () => {
    describe('Permissions accepted', () => {
      it('should default display children when access is available', () => {
        const wrapper = mount(
          <MockProvider store={store}>
            <WithPermissions hasPermissions={[PERMISSIONS.DATA_DOWNLOAD]}>
              <div className={'accessible'}>accessible data</div>
            </WithPermissions>
          </MockProvider>,
        );
        expect(
          // @ts-ignore
          wrapper.find('WithPermissionsComponent').props().hasAccess,
        ).toEqual(true);
        expect(
          // @ts-ignore
          wrapper.find('WithPermissionsComponent').props().permissions,
        ).toEqual({ hasDataDownload: true });
      });
    });
    describe('Permissions denied', () => {
      it('should default display children when access is available', () => {
        const wrapper = mount(
          <MockProvider store={store}>
            <WithPermissions hasPermissions={[PERMISSIONS.GLUCOSE_STATISTICS]}>
              <div>never got here</div>
            </WithPermissions>
          </MockProvider>,
        );
        wrapper.update();
        expect(
          // @ts-ignore
          wrapper.find('WithPermissionsComponent').props().hasAccess,
        ).toEqual(false);
        expect(
          // @ts-ignore
          wrapper.find('WithPermissionsComponent').props().permissions,
        ).toEqual({ hasExportGlucoseStatistics: false });
      });
    });
  });
});
