import { path } from 'ramda';
import { matchPath } from 'react-router-dom';
import { createSelector } from 'reselect';

import {
  AppLogo,
  UDtcIcon,
  HelpIcon,
  HomeIcon,
  PatientDashboardIcon,
  PatternsIcon,
  PatientsIcon,
  QuestionIcon,
  StripStockIcon,
} from 'src/assets/icons';
import { selectCurrentPermissions } from 'src/core/permissions/permissions.selectors';

const getDomainRoutes = path(['domains', 'routes']);
const getRouterPathname = path(['router', 'location', 'pathname']);

export const getCombinedRoutes = createSelector(
  [getDomainRoutes],
  domainRoutes => ({
    ...domainRoutes,
  }),
);

const MENU_LINK_TYPES = {
  LINK: 'LINK',
  HREF: 'HREF',
  BUTTON: 'BUTTON',
};

export const getMenuLinks = createSelector(
  getCombinedRoutes,
  getRouterPathname,
  selectCurrentPermissions,
  (routes, currentPathname, permissions) => {
    const links = {
      logo: {
        name: 'logoIcon',
        icon: AppLogo,
        iconHeight: 60,
        type: MENU_LINK_TYPES.LINK,
        props: {
          to: routes.general.home,
        },
      },
      home: {
        name: 'homeIcon',
        icon: HomeIcon,
        iconHeight: 16,
        type: MENU_LINK_TYPES.LINK,
        props: {
          to: routes.general.home,
        },
      },
      patients: {
        name: 'patientsIcon',
        icon: PatientsIcon,
        iconHeight: 23,
        type: MENU_LINK_TYPES.LINK,
        props: {
          to: routes.patient.patients,
        },
      },
      strips: {
        name: 'stripsStockIcon',
        icon: StripStockIcon,
        iconHeight: 21,
        type: MENU_LINK_TYPES.LINK,
        props: {
          to: routes.stripManagement.stock,
        },
      },
      dtc: {
        name: 'dtcIcon',
        icon: UDtcIcon,
        iconHeight: 35,
        type: MENU_LINK_TYPES.BUTTON,
      },
      info: {
        name: 'infoIcon',
        icon: HelpIcon,
        iconHeight: 18,
        type: MENU_LINK_TYPES.BUTTON,
      },
      help: {
        name: 'helpIcon',
        icon: QuestionIcon,
        iconHeight: 18,
        type: MENU_LINK_TYPES.LINK,
        props: {
          to: routes.general.help,
        },
      },
    };

    const isAdministrativeRole = !permissions.hasProfessionalManagementCreate;

    const parsedPatientRoute = matchPath(currentPathname, {
      path: routes.patient.patientById,
      exact: false,
      strict: false,
    });

    const isPatientSpecificRoute = !!parsedPatientRoute;

    const isDashboardRoute = matchPath(currentPathname, {
      path: isAdministrativeRole
        ? routes.stripManagement.stripInfoByPatient
        : routes.patient.patientById,
      exact: true,
      strict: false,
    });

    if (isPatientSpecificRoute) {
      links.advancedIndicators = {
        name: 'advancedIndicators',
        icon: PatternsIcon,
        iconHeight: 16,
        type: MENU_LINK_TYPES.LINK,
        props: {
          exact: true,
          to: routes.indicators.main.replace(
            ':id',
            parsedPatientRoute.params.id,
          ),
        },
      };
    }

    if (isPatientSpecificRoute && !isDashboardRoute) {
      const dashboardRoute = isAdministrativeRole
        ? routes.stripManagement.stripInfoByPatient
        : routes.patient.patientById;
      links.patientDashboard = {
        name: 'patientDashboardIcon',
        icon: PatientDashboardIcon,
        iconHeight: 23,
        type: MENU_LINK_TYPES.LINK,
        props: {
          exact: true,
          to: dashboardRoute.replace(':id', parsedPatientRoute.params.id),
        },
      };
    }

    return links;
  },
);
