import * as React from 'react';
import { shallow } from 'enzyme';

import {
  hasPatientDiagnostics,
  hasPatientDiagnosticsPermissionChanged,
  addDiagnosticsPermissionLifecycle,
} from './patient-dashboard.utils';

describe('Patient Dashboard Utils', () => {
  const ComponentDashboard = () => <span />;

  const mockPermissionsBase = {
    hasDataDownload: true,
    hasDataDownloadAssignment: true,
    hasDeactivatePatientDevices: true,
  };
  const mockPermissionsGraphs = {
    ...mockPermissionsBase,
    hasUserShowGraphicConfiguration: true,
  };

  describe('Permission Validation Util tests', () => {
    it('validate that a patient has permission to see graphs', () => {
      expect(hasPatientDiagnostics(mockPermissionsGraphs)).toBeTruthy();
      expect(hasPatientDiagnostics(mockPermissionsBase)).toBeFalsy();
    });
    it('should validate that patient graph permissions have changed', () => {
      expect(
        hasPatientDiagnosticsPermissionChanged(
          mockPermissionsBase,
          mockPermissionsGraphs,
        ),
      ).toBeTruthy();
      expect(
        hasPatientDiagnosticsPermissionChanged(
          mockPermissionsBase,
          mockPermissionsBase,
        ),
      ).toBeFalsy();
    });
    it('should recognize that permissions have changed when they were previously unset', () => {
      expect(
        hasPatientDiagnosticsPermissionChanged({}, mockPermissionsBase),
      ).toBeTruthy();
    });
  });
  describe('Lifecycle Helper Tests', () => {
    const ComponentWithLifecycle = addDiagnosticsPermissionLifecycle(
      ComponentDashboard,
    );

    it('should update the dashboard component only when permission props changed', () => {
      const mockProps = {
        currentPermissions: mockPermissionsBase,
      };
      const nextProps = {
        currentPermissions: mockPermissionsGraphs,
      };
      const wrapper = shallow(<ComponentWithLifecycle {...mockProps} />);
      const shouldUpdate = wrapper.instance().shouldComponentUpdate(nextProps);
      expect(shouldUpdate).toBeTruthy();
    });
    it('should prevent re-render when graph permission has not changed', () => {
      const mockProps = {
        currentPermissions: mockPermissionsBase,
      };
      const wrapper = shallow(<ComponentWithLifecycle {...mockProps} />);
      const shouldNotUpdate = wrapper
        .instance()
        .shouldComponentUpdate(mockProps);
      expect(shouldNotUpdate).toBeFalsy();
    });
    it('should render on the first pass when permissions load', () => {
      const mockProps = {
        currentPermissions: {},
      };
      const nextProps = {
        currentPermissions: mockPermissionsGraphs,
      };
      const wrapper = shallow(<ComponentWithLifecycle {...mockProps} />);
      const shouldUpdate = wrapper.instance().shouldComponentUpdate(nextProps);
      expect(shouldUpdate).toBeTruthy();
    });
  });
});
