import { LOGBOOK_HAS_DROPDOWN } from 'src/domains/diagnostics/constants';
import {
  GRAPHS,
  GRAPH_CONTAINER_MIN_HEIGHT,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';

const fitContent = 'min-content';
const flexibleHeight = `minmax(${GRAPH_CONTAINER_MIN_HEIGHT}, 100%)`;

export const getGridSizeRuleForGraphContainer = graph =>
  [GRAPHS.BLOOD_GLUCOSE_GENERAL_STATS, GRAPHS.INSULIN].includes(graph)
    ? fitContent
    : flexibleHeight;

export const getGraphNameFromUrl = (path, url) =>
  path.replace(`${url}/`, '').split('/')[0];

export const historyRoutePush = (dropdownValue, history) =>
  LOGBOOK_HAS_DROPDOWN ? history.push(dropdownValue) : true;
