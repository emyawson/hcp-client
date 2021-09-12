import {
  GRAPHS,
  GRAPH_LOGBOOK,
  GRAPH_LOGBOOK_STATS,
  GRAPH_LOGBOOK_DIARY,
  LOGBOOK_TYPE_STATS,
  LOGBOOK_TYPE_DIARY,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import { LOGBOOK_HAS_DROPDOWN } from 'src/domains/diagnostics/constants';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { historyRoutePush } from './graph-wrapper.util';

const logbookDropDownOptions = [
  {
    label: GRAPH_LOGBOOK,
    value: GRAPH_LOGBOOK,
  },
  {
    label: LOGBOOK_TYPE_DIARY,
    value: GRAPH_LOGBOOK_DIARY,
  },
  {
    label: LOGBOOK_TYPE_STATS,
    value: GRAPH_LOGBOOK_STATS,
  },
];

export const tabs = changeGraph => [
  {
    path: GRAPHS.TREND,
    link: GRAPHS.TREND,
    name: translate('graphs.trendTitle'),
    onClick: () => changeGraph(GRAPHS.TREND),
    hasDropDown: false,
    modelPath: 'ui.patientDashboard.graphType',
  },
  {
    path: GRAPHS.STANDARD_DAY,
    link: GRAPHS.STANDARD_DAY,
    name: translate('graphs.standardDayTitle'),
    onClick: () => changeGraph(GRAPHS.STANDARD_DAY),
    hasDropDown: false,
    modelPath: 'ui.patientDashboard.graphType',
  },
  {
    path: GRAPHS.STANDARD_WEEK,
    link: GRAPHS.STANDARD_WEEK,
    name: translate('graphs.standardWeekTitle'),
    onClick: () => changeGraph(GRAPHS.STANDARD_WEEK),
    hasDropDown: false,
    modelPath: 'ui.patientDashboard.graphType',
  },
  {
    path: GRAPHS.LOGBOOK,
    link: GRAPHS.LOGBOOK,
    name: translate('graphs.logbookTitle'),
    onClick: (v, h) => {
      historyRoutePush(v, h); // this will be bypassed if hasDropDown is false
      changeGraph(GRAPHS.LOGBOOK);
    },
    hasDropDown: LOGBOOK_HAS_DROPDOWN,
    // No effect when hasDropDown is false
    dropDownOptions: logbookDropDownOptions,
    // Used with react-redux-forms to connect a control to the store
    // No effect if hasDropDown is false
    modelPath: 'ui.patientDashboard.logbookType',
  },
  {
    path: GRAPHS.METABOLIC_RATE,
    link: GRAPHS.METABOLIC_RATE,
    name: translate('graphs.metabolicTitle'),
    onClick: () => changeGraph(GRAPHS.METABOLIC_RATE),
    hasDropDown: false,
    modelPath: 'ui.patientDashboard.graphType',
  },
  {
    path: `${GRAPHS.BLOOD_GLUCOSE_GENERAL_STATS}/all`,
    link: `${GRAPHS.BLOOD_GLUCOSE_GENERAL_STATS}/all`,
    name: translate('bloodGlucoseStats.titleNav'),
    onClick: () => changeGraph(GRAPHS.BLOOD_GLUCOSE_GENERAL_STATS),
    hasDropDown: false,
    activeTitle: GRAPHS.BLOOD_GLUCOSE_GENERAL_STATS,
  },
  {
    path: GRAPHS.INSULIN,
    link: GRAPHS.INSULIN,
    name: translate('graphs.insulin.title'),
    hasDropDown: false,
  },
  {
    path: GRAPHS.INSULIN_PUMP,
    link: GRAPHS.INSULIN_PUMP,
    name: translate('graphs.insulinPumpTitle'),
    hasDropDown: false,
  },
];
